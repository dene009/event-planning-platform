// backend/middleware/authenticate.js
const { expressjwt: expressJwt } = require("express-jwt");
require("dotenv").config(); // Load environment variables from a .env file

// Use an environment variable for the secret key
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key"; // Replace with secure key in production

// Set up JWT authentication middleware
const authenticate = expressJwt({
  secret: SECRET_KEY,
  algorithms: ["HS256"],
  requestProperty: "auth", // Attach decoded token data to req.auth
  getToken: (req) => {
    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      return req.headers.authorization.split(" ")[1];
    }
    return null; // Return null if no token found
  },
}).unless({ path: ["/api/login", "/api/register"] }); // Public routes without authentication

// Export middleware
module.exports = authenticate;

