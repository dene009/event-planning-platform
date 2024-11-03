const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env
const app = express();
const PORT = process.env.PORT || 5001;
const cookieParser = require("cookie-parser");

// Models
const Event = require("./models/Event");       // Event model
const User = require("./models/User");         // User model
const Booking = require('./models/Booking');   // Booking model
const authenticate = require("./middleware/authenticate.js");  // JWT authentication middleware


// Middleware
app.use(cors());           // Enable CORS
app.use(express.json());    // Parse JSON bodies
app.use(cookieParser());  // Tell Express to use cookie-parser

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

  // Secret Key for JWT
const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
const ACCESS_TOKEN_EXPIRY = "15m"; // Short-lived access token (10 minutes)
const REFRESH_TOKEN_EXPIRY = "7d"; // Longer-lived refresh token (1 day)


// Routes

// Basic route to test server response
app.get('/', (req, res) => {
  res.send('Hello from Node.js backend it is currently running - fired up by Esidene!');
});

// User registration endpoint
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).json({ message: "Registration failed", error });
  }
});

// Generate tokens
function generateAccessToken(user) {
  return jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

function generateRefreshToken(user) {
  return jwt.sign({ userId: user._id }, REFRESH_SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

// user Login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "Strict" });
    res.json({ accessToken, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Login failed", error });
  }
});

// Refresh token endpoint
app.post("/api/refresh-token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });

  jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });
    const newAccessToken = generateAccessToken({ userId: user.userId });
    res.json({ accessToken: newAccessToken });
  });
});

// Protected route example (JWT authentication required)
app.get("/api/protected-route", authenticate, (req, res) => {
  res.status(200).json({ message: "This is a protected route" });
});

// Endpoint to create a new event booking (authentication required)
app.post('/api/book-event', authenticate, async (req, res) => {
  const bookingData = req.body;

  try {
    // Attach user ID from the token to the booking data
    const booking = new Booking({ ...bookingData, userId: req.auth.userId });
    await booking.save();
    res.status(201).json({ message: 'Booking confirmed!', booking });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ message: 'Error saving booking data', error });
  }
});

// Endpoint to create a booking for a specific event ID (authentication required)
app.post("/api/book-event/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const bookingData = req.body;

  try {
    // Save booking data with specified event ID and authenticated user ID
    const booking = new Booking({ ...bookingData, eventId: id, userId: req.auth.userId });
    await booking.save();
    res.status(201).json({ message: "Booking confirmed for specific event!", booking });
  } catch (error) {
    console.error("Error saving booking for event:", error);
    res.status(500).json({ message: "Error saving booking data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
