import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { bus, selectedSeats } = location.state || {
    bus: {
      name: "Express Bus",
      from: "City A",
      to: "City B",
      time: "09:00 - 12:00",
      fare: 750,
    },
    selectedSeats: [1, 2, 3],
  };

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    setIsPaid(true);

    // Redirect to ticket page after 2 sec
    setTimeout(() => {
      navigate("/ticket", {
        state: { bus, selectedSeats, paymentMethod },
      });
    }, 2000);
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 5%",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          padding: "40px 50px",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        {isPaid ? (
          <div
            style={{
              textAlign: "center",
              color: "#222",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#4CAF50",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "36px",
                margin: "0 auto 20px",
              }}
            >
              ✓
            </div>
            <h2 style={{ fontSize: "26px", fontWeight: "700" }}>
              Payment Successful
            </h2>
            <p style={{ color: "#666", marginTop: "10px" }}>
              Redirecting to your ticket...
            </p>
          </div>
        ) : (
          <>
            {/* Title */}
            <h2
              style={{
                textAlign: "center",
                fontSize: "26px",
                fontWeight: "700",
                marginBottom: "30px",
              }}
            >
              Confirm Payment
            </h2>

            {/* Ticket + Payment Info */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              {/* Left Side - Ticket Details */}
              <div
                style={{
                  flex: "1",
                  minWidth: "300px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "15px",
                    color: "#333",
                  }}
                >
                  Ticket Details
                </h3>
                <p>
                  <b>Bus Name:</b> {bus.name}
                </p>
                <p>
                  <b>From:</b> {bus.from}
                </p>
                <p>
                  <b>To:</b> {bus.to}
                </p>
                <p>
                  <b>Time:</b> {bus.time}
                </p>
                <p>
                  <b>Seats:</b> {selectedSeats.join(", ")}
                </p>
                <p>
                  <b>Total Fare:</b>{" "}
                  <span style={{ color: "#ff7a00", fontWeight: "600" }}>
                    ₹{bus.fare || 750}
                  </span>
                </p>
              </div>

              {/* Right Side - Payment Options */}
              <div
                style={{
                  flex: "1",
                  minWidth: "300px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "15px",
                    color: "#333",
                  }}
                >
                  Select Payment
                </h3>

                {["UPI", "Card", "Net Banking"].map((method) => (
                  <label
                    key={method}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "12px",
                      cursor: "pointer",
                      fontSize: "15px",
                      color: "#444",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                    />
                    {method}
                  </label>
                ))}

                <button
                  onClick={handlePayment}
                  style={{
                    backgroundColor: "#ff7a00",
                    border: "none",
                    color: "#fff",
                    padding: "12px 25px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "15px",
                    cursor: "pointer",
                    marginTop: "10px",
                    width: "100%",
                    boxShadow: "0 4px 10px rgba(255,122,0,0.3)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Pay ₹{bus.fare || 750}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
