import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SeatSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const bus = location.state || {
    name: "Express Bus",
    from: "City A",
    to: "City B",
    time: "09:00 - 12:00",
  };

  const [selectedSeats, setSelectedSeats] = useState([]);

  // Generate seat numbers (1–45)
  const seats = Array.from({ length: 45 }, (_, i) => i + 1);

  // Handle seat click
  const toggleSeat = (seatNo) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNo)
        ? prev.filter((s) => s !== seatNo)
        : [...prev, seatNo]
    );
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat before proceeding.");
      return;
    }

    navigate("/payment", {
      state: {
        bus,
        selectedSeats,
      },
    });
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "40px 5%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Bus Details */}
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <h2
          style={{
            fontSize: "26px",
            fontWeight: "700",
            color: "#222",
          }}
        >
          {bus.name || "GoBus"}
        </h2>
        <p style={{ color: "#555", fontSize: "15px", margin: "4px 0" }}>
          {bus.from} → {bus.to}
        </p>
        <p style={{ color: "#777", fontSize: "14px" }}>{bus.time}</p>
      </div>

      {/* Bus Seat Layout */}
      <div
        style={{
          backgroundColor: "#fafafa",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          padding: "30px 40px",
          width: "fit-content",
        }}
      >
        {/* Driver side */}
        <div
          style={{
            textAlign: "right",
            marginBottom: "12px",
            color: "#ff7a00",
            fontWeight: "600",
          }}
        >
          🚌 Driver
        </div>

        {/* 10 Rows of 4 Seats (2 + gap + 2) */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: "repeat(10, auto)",
            gap: "10px",
          }}
        >
          {[...Array(10)].map((_, rowIndex) => {
            const start = rowIndex * 4 + 1;
            const rowSeats = seats.slice(start - 1, start + 3);

            return (
              <div
                key={rowIndex}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 50px)",
                  justifyItems: "center",
                  alignItems: "center",
                  columnGap: "10px",
                }}
              >
                {rowSeats.map((seatNo, index) => (
                  <React.Fragment key={seatNo}>
                    {index === 2 && <div></div>}
                    <div
                      onClick={() => toggleSeat(seatNo)}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        border: "2px solid #ccc",
                        backgroundColor: selectedSeats.includes(seatNo)
                          ? "#ff7a00"
                          : "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                          color: selectedSeats.includes(seatNo)
                            ? "#fff"
                            : "#444",
                        }}
                      >
                        {seatNo}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            );
          })}
        </div>

        {/* Last Row (5 Seats) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 50px)",
            justifyItems: "center",
            marginTop: "20px",
            gap: "10px",
          }}
        >
          {seats.slice(40).map((seatNo) => (
            <div
              key={seatNo}
              onClick={() => toggleSeat(seatNo)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                border: "2px solid #ccc",
                backgroundColor: selectedSeats.includes(seatNo)
                  ? "#ff7a00"
                  : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: selectedSeats.includes(seatNo) ? "#fff" : "#444",
                }}
              >
                {seatNo}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Summary */}
      <div style={{ marginTop: "25px", textAlign: "center" }}>
        {selectedSeats.length > 0 ? (
          <p style={{ color: "#333" }}>
            Selected Seats:{" "}
            <b style={{ color: "#ff7a00" }}>{selectedSeats.join(", ")}</b>
          </p>
        ) : (
          <p style={{ color: "#777" }}>No seats selected yet.</p>
        )}
      </div>

      {/* Book Now Button */}
      <button
        onClick={handleBooking}
        style={{
          backgroundColor: "#ff7a00",
          color: "#fff",
          border: "none",
          padding: "14px 28px",
          borderRadius: "8px",
          fontWeight: "600",
          fontSize: "16px",
          marginTop: "20px",
          cursor: "pointer",
          boxShadow: "0 6px 14px rgba(255, 122, 0, 0.3)",
        }}
      >
        Book Now
      </button>
    </div>
  );
}
