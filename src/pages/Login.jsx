import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useBooking } from "../state/BookingContext";

export default function Login() {
  const navigate = useNavigate();
const { setUser } = useBooking();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      // ✅ Debug: log what backend sends
      console.log("Login response:", data);

      if (data.success) {
        // ✅ Save user + token to localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        // ✅ Update context (important!)
      setUser(data.user);

        alert("✅ Login successful!");
        navigate("/home"); // redirect to home page
      } else {
        alert(data.message || "❌ Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("⚠️ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ff7a00, #ff9a2b)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px 50px",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          width: "350px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#ff7a00",
            fontWeight: 700,
          }}
        >
          GoBus Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "5px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: loading ? "#ccc" : "#ff7a00",
              color: "#fff",
              border: "none",
              padding: "12px 0",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#ff7a00", fontWeight: 600 }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
