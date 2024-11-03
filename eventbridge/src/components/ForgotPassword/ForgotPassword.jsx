// ForgotPassword.jsx
import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Make sure 'email' is defined in the component
      });
  
      if (!response.ok) {
        // If response is not OK, capture the response details
        const errorData = await response.json();
        console.error("Forgot password error:", errorData);
        alert(errorData.message || "Failed to reset password. Please try again.");
        return;
      }
  
      const data = await response.json();
      alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
      // Log any network or unexpected errors
      console.error("Unexpected forgot password error:", error);
      alert(error.message || "An error occurred. Please try again.");
    }
  };
  

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Email regex pattern
          />
        </label>
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;