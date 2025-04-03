import express from "express";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config(); // Load environment variables


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../public/uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if not exists
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) console.error("Database connection failed:", err);
  else console.log("Connected to database");
});

// **Attendee Signup** (User Registration)
app.post("/attendee/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length > 0) return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });

        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
});

// **Attendee Login** (User Sign-In)
app.post("/attendee/signin", async (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  });
});

// **Organizer Signup** (Organizers Registration)
// **Organizer Signup** (Organizer Registration)
app.post("/organizer/signup", async (req, res) => {
    const { name, username, password } = req.body; // `username` here is the email

    // Check if organizer already exists
    db.query("SELECT * FROM organisers WHERE username = ?", [username], async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length > 0) return res.status(400).json({ error: "Organizer already exists" });

        // Hash password before storing in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new organizer into the database
        db.query(
            "INSERT INTO organisers (name, username, password) VALUES (?, ?, ?)",
            [name, username, hashedPassword],
            (err, result) => {
                if (err) return res.status(500).json({ error: "Database error" });

                res.status(201).json({ message: "Organizer registered successfully" });
            }
        );
    });
});

// **Organizer Login** (Organizer Sign-In)
app.post("/organizer/signin", async (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM organisers WHERE username = ?", [email], async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (results.length === 0) {
          console.log("User Not Found!"); // Log if no user is found
          return res.status(401).json({ error: "Invalid credentials (User not found)" });
      }

      const user = results[0];

      // Compare the entered password with the stored hashed password
      const isMatch = await bcrypt.compare(password.trim(), user.password);

      if (!isMatch) {
          console.log("Password Mismatch!"); // Log if password doesn't match
          return res.status(401).json({ error: "Invalid credentials (Password mismatch)" });
      }

      // ✅ Store `organiser_id` in the token payload
      const token = jwt.sign({ userId: user.organiser_id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // ✅ Include `organiser_id` in the response
      res.json({ message: "Login successful", token, organizerId: user.organiser_id });
  });
});

app.post("/events/create", (req, res) => {
  const { title, description, date, time, venue, organiser, categories } = req.body;

  if (!title || !description || !date || !time || !venue || !organiser || categories.length === 0) {
      return res.status(400).json({ error: "All fields are required!" });
  }

  const query = `INSERT INTO Events (title, description, date, time, venue, organiser) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [title, description, date, time, venue, organiser], (err, result) => {
      if (err) return res.status(500).json({ error: "Database error", details: err });

      const eventId = result.insertId;

      // Insert categories
      const categoryQueries = categories.map(category => {
          return new Promise((resolve, reject) => {
              db.query(`INSERT INTO Categories (event_id, category) VALUES (?, ?)`, [eventId, category], (err) => {
                  if (err) reject(err);
                  else resolve();
              });
          });
      });

      Promise.all(categoryQueries)
          .then(() => res.status(201).json({ message: "Event created successfully", event_id: eventId }))
          .catch(err => res.status(500).json({ error: "Category insert error", details: err }));
  });
});

app.put("/events/update", (req, res) => {
  const { event_id, reg_start_date, reg_end_date, price, capacity } = req.body;

  if (!event_id || !reg_start_date || !reg_end_date || price === undefined || !capacity) {
      return res.status(400).json({ error: "All fields are required!" });
  }

  const query = `UPDATE Events SET reg_start_date = ?, reg_end_date = ?, price = ?, capacity = ? WHERE event_id = ?`;

  db.query(query, [reg_start_date, reg_end_date, price, capacity, event_id], (err, result) => {
      if (err) return res.status(500).json({ error: "Database error", details: err });

      res.status(200).json({ message: "Event updated successfully" });
  });
});

app.post("/events/upload-pics", upload.fields([{ name: "images", maxCount: 10 }, { name: "cover_image", maxCount: 1 }]), (req, res) => {
  const { event_id } = req.body;

  if (!event_id || !req.files["images"] || !req.files["cover_image"]) {
      return res.status(400).json({ error: "Cover image and event images are required!" });
  }

  const coverImagePath = `uploads/${req.files["cover_image"][0].filename}`;

  // Insert cover image path into Events table
  db.query(
      "UPDATE Events SET cover_image = ? WHERE event_id = ?",
      [coverImagePath, event_id],
      (err) => {
          if (err) {
              console.error("Error saving cover image:", err);
              return res.status(500).json({ error: "Cover image insert error" });
          }
      }
  );

  // Insert event images into EventPics table
  const imageQueries = req.files["images"].map(file => {
      const filePath = `uploads/${file.filename}`;
      return new Promise((resolve, reject) => {
          db.query(
              "INSERT INTO EventPics (event_id, address) VALUES (?, ?)", 
              [event_id, filePath], 
              (err) => {
                  if (err) reject(err);
                  else resolve();
              }
          );
      });
  });

  Promise.all(imageQueries)
      .then(() => res.status(201).json({ message: "Images uploaded successfully!" }))
      .catch(err => res.status(500).json({ error: "Image insert error", details: err }));
});

app.get("/events/recent", (req, res) => {
  const query = `
      SELECT event_id, title, description, cover_image 
      FROM Events 
      WHERE approved = 1 
      ORDER BY event_id DESC 
      LIMIT 4
  `;

  db.query(query, (err, results) => {
      if (err) {
          console.error("Error fetching events:", err);
          return res.status(500).json({ error: "Internal server error" });
      }
      res.json(results);
  });
});
app.get("/events/filter", (req, res) => {
  const { startDate, endDate, categories } = req.query;

  let query = `
      SELECT e.event_id, e.title, e.description, e.date, e.time, e.venue, e.cover_image, 
             GROUP_CONCAT(c.category) AS categories
      FROM Events e
      LEFT JOIN Categories c ON e.event_id = c.event_id
      WHERE e.approved = 1 AND e.reg_end_date >= CURDATE()
  `;
  let queryParams = [];

  if (startDate) {
      query += " AND e.date >= ?";
      queryParams.push(startDate);
  }
  if (endDate) {
      query += " AND e.date <= ?";
      queryParams.push(endDate);
  }
  if (categories) {
      const categoryList = categories.split(",").map(cat => `'${cat}'`).join(",");
      query += ` AND e.event_id IN (SELECT event_id FROM Categories WHERE category IN (${categoryList}))`;
  }

  query += " GROUP BY e.event_id ORDER BY e.date ASC"; // Ensure proper grouping and ordering

  db.query(query, queryParams, (err, results) => {
      if (err) {
          console.error("Error fetching filtered events:", err);
          return res.status(500).json({ error: "Database error" });
      }
      
      // Convert categories from CSV string to an array
      results.forEach(event => {
          event.categories = event.categories ? event.categories.split(",") : [];
      });

      res.json(results);
  });
});




// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));