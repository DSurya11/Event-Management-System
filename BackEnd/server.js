import express from "express";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

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

    console.log("Login Attempt with Email:", email); // Log the email being received

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

        // Generate JWT token
        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));