const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables
const cookieParser = require("cookie-parser");

// Import Models and Middleware
const Event = require("./models/Event");
const User = require("./models/User");
const Booking = require('./models/Booking');
const authenticate = require("./middleware/authenticate.js");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/eventbridge";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if connection fails
  });

// Environment Variables
const SECRET_KEY = process.env.SECRET_KEY || "defaultSecretKey";
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || "defaultRefreshSecretKey";
const ACCESS_TOKEN_EXPIRY = "15m"; 
const REFRESH_TOKEN_EXPIRY = "7d";

// Utility Functions
const generateAccessToken = (user) => 
  jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRY });

const generateRefreshToken = (user) => 
  jwt.sign({ userId: user._id }, REFRESH_SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRY });

// Routes
app.get('/', (req, res) => res.send('Hello from Node.js backend!'));

// User Registration
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Registration failed", error });
  }
});

// User Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });
    res.json({ accessToken, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Login failed", error });
  }
});

// Refresh Token
app.post("/api/refresh-token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });

  jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });
    const newAccessToken = generateAccessToken({ userId: user.userId });
    res.json({ accessToken: newAccessToken });
  });
});

// Protected Route
app.get("/api/protected-route", authenticate, (req, res) => {
  res.status(200).json({ message: "This is a protected route" });
});

// Create Event Booking
app.post('/api/book-event', authenticate, async (req, res) => {
  try {
    const booking = new Booking({ ...req.body, userId: req.auth.userId });
    await booking.save();
    res.status(201).json({ message: 'Booking confirmed!', booking });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ message: 'Error saving booking data', error });
  }
});

// Book Event by ID
app.post("/api/book-event/:id", authenticate, async (req, res) => {
  try {
    const booking = new Booking({ ...req.body, eventId: req.params.id, userId: req.auth.userId });
    await booking.save();
    res.status(201).json({ message: "Booking confirmed for specific event!", booking });
  } catch (error) {
    console.error("Error saving booking for event:", error);
    res.status(500).json({ message: "Error saving booking data", error });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
