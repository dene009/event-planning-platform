import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Login.css"; // Ensure this file exists or remove it if not necessary.

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // The intended destination after login, or default to home if not specified
  const redirectTo = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.accessToken); // Save token securely
        navigate(redirectTo); // Redirect after successful login
      } else if (response.status === 401) {
        alert("Invalid credentials. Please try again.");
      } else {
        alert("An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
        </label>
        <button type="submit">Login</button>

        {/* Links to Register and Forgot Password */}
        <h5>
          <Link to="/register">Register</Link> | <Link to="/forgot-password">Forgot your password?</Link>
        </h5>
      </form>
    </div>
  );
};

export default Login;
