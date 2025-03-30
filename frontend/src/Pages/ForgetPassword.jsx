import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CSS/ForgetPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Password reset link sent to your email.");
        setError("");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to send reset email. Try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <p>Enter your email to reset your password</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <button onClick={handleForgotPassword}>Send Reset Link</button>
      <p className="back-to-login">
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
