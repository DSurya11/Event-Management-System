import express from "express";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import Razorpay from "razorpay";

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

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// **Generate Payment QR Code**
app.post("/payment/qr", async (req, res) => {
  const { amount, upiId } = req.body; // Allow dynamic UPI ID

  if (!upiId) {
    return res.status(400).json({ error: "UPI ID is required" });
  }

  const options = {
    amount: amount * 100, // Convert to paisa
    currency: "INR",
    payment_capture: 1, // Auto-capture payment
  };

  try {
    // Create an order in Razorpay
    const order = await razorpay.orders.create(options);

    // Generate a UPI QR Code dynamically
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${encodeURIComponent(upiId)}&pn=YourStore&mc=123456&tid=${order.id}&tr=${order.id}&tn=Payment&am=${amount}&cu=INR`;

    res.json({ qrCodeUrl, orderId: order.id });
  } catch (error) {
    console.error("QR Code Error:", error);
    res.status(500).json({ error: error.message });
  }
});
app.post("/payment/verify", async (req, res) => {
  const { orderId } = req.body;

  try {
    const payments = await razorpay.orders.fetchPayments(orderId);

    if (payments.items.length > 0 && payments.items[0].status === "captured") {
      res.json({ success: true, message: "Payment Successful ✅" });
    } else {
      res.json({ success: false, message: "Payment Pending ⏳" });
    }
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({ error: error.message });
  }
});


// **Attendee Signup**
app.post("/attendee/signup", async (req, res) => {
  const { name, email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length > 0) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

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

// **Attendee Login**
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

// **Organizer Signup**
app.post("/organizer/signup", async (req, res) => {
  const { name, username, password } = req.body;

  db.query("SELECT * FROM organisers WHERE username = ?", [username], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length > 0) return res.status(400).json({ error: "Organizer already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

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

// **Organizer Login**
app.post("/organizer/signin", async (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM organisers WHERE username = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials (User not found)" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials (Password mismatch)" });
    }

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
