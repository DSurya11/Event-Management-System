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
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "planova",
});

db.connect((err) => {
  if (err) console.error("Database connection failed:", err);
  else console.log("Connected to database");
});

// User Signup
app.post("/register", async (req, res) => {
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

// User Login
app.post("/login", async (req, res) => {
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
