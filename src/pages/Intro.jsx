import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const slides = [
    {
      image: "/intro1.svg",
      title: "Welcome to GoBus",
      text: "Your travel companion for safe and seamless journeys.",
    },
    {
      image: "/intro2.svg",
      title: "Book in Seconds",
      text: "Find routes, choose seats, and book tickets instantly.",
    },
    {
      image: "/intro3.svg",
      title: "Travel Smarter",
      text: "Track your bus, get e-tickets, and enjoy your trip stress-free.",
    },
  ];

  const handleNext = () => {
    if (index < slides.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      navigate("/home"); // redirect after last slide
    }
  };

  const { image, title, text } = slides[index];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #ff7a00, #ffb347)",
        color: "#fff",
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Illustration */}
      <img
        src={image}
        alt="Intro Illustration"
        style={{
          width: "300px",
          height: "auto",
          marginBottom: "30px",
          animation: "fadeIn 0.6s ease",
        }}
      />

      {/* Title & Text */}
      <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "10px" }}>
        {title}
      </h1>
      <p
        style={{
          fontSize: "16px",
          maxWidth: "420px",
          opacity: 0.9,
          marginBottom: "40px",
        }}
      >
        {text}
      </p>

      {/* Dots */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "25px" }}>
        {slides.map((_, i) => (
          <div
            key={i}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: i === index ? "#fff" : "rgba(255,255,255,0.5)",
              transition: "0.3s ease",
            }}
          ></div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        style={{
          backgroundColor: "#fff",
          color: "#ff7a00",
          border: "none",
          padding: "12px 30px",
          borderRadius: "8px",
          fontWeight: "600",
          fontSize: "16px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#ffefd5")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
      >
        {index === slides.length - 1 ? "Get Started" : "Next"}
      </button>

      {/* Fade animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
