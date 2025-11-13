import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useBooking } from "../state/BookingContext";

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useBooking();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Registration successful! Please login now.");
      navigate("/login");
    } else {
      alert(data.message || "Registration failed ❌");
    }
  } catch (error) {
    console.error("Register Error:", error);
    alert("Server error, please try again later.");
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
          GoBus Register
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
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
            className="btn"
            disabled={loading}
            style={{ width: "100%", marginTop: "10px" }}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#ff7a00", fontWeight: 600 }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
