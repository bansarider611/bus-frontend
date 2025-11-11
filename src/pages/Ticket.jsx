import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketRef = useRef();

  const { bus, selectedSeats, paymentMethod } = location.state || {
    bus: {
      name: "Express Bus",
      from: "City A",
      to: "City B",
      time: "09:00 - 12:00",
      fare: 750,
    },
    selectedSeats: [1, 2],
    paymentMethod: "UPI",
  };

  // 🧾 Download PDF Ticket
  const handleDownload = async () => {
    const ticket = ticketRef.current;
    const canvas = await html2canvas(ticket, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("GoBus_Ticket.pdf");
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
        padding: "60px 5%",
      }}
    >
      <div
        ref={ticketRef}
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          padding: "40px 50px",
          width: "100%",
          maxWidth: "700px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* ✅ Success Icon */}
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

        <h2
          style={{
            fontSize: "26px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          Booking Confirmed!
        </h2>
        <p style={{ color: "#555", marginBottom: "25px" }}>
          Your GoBus ticket has been successfully booked.
        </p>

        {/* ✅ Ticket Box */}
        <div
          style={{
            border: "2px dashed #ddd",
            borderRadius: "12px",
            padding: "25px",
            marginBottom: "30px",
            textAlign: "left",
          }}
        >
          <h3
            style={{
              color: "#ff7a00",
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            GoBus E-Ticket
          </h3>
          <p>
            <b>Bus Name:</b> {bus.name}
          </p>
          <p>
            <b>Route:</b> {bus.from} → {bus.to}
          </p>
          <p>
            <b>Time:</b> {bus.time}
          </p>
          <p>
            <b>Seats:</b> {selectedSeats.join(", ")}
          </p>
          <p>
            <b>Payment Method:</b> {paymentMethod}
          </p>
          <p>
            <b>Total Fare:</b>{" "}
            <span style={{ color: "#ff7a00", fontWeight: "600" }}>
              ₹{bus.fare || 750}
            </span>
          </p>

          {/* ✅ QR Code */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <QRCodeCanvas
              value={`GoBus | ${bus.from} → ${bus.to} | Seats: ${selectedSeats.join(
                ", "
              )} | Time: ${bus.time}`}
              size={120}
              bgColor="#ffffff"
              fgColor="#000000"
              level="Q"
              includeMargin={true}
            />
            <p
              style={{
                fontSize: "13px",
                color: "#777",
                marginTop: "8px",
              }}
            >
              Scan to verify your ticket
            </p>
          </div>
        </div>

        {/* ✅ Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <button
            onClick={handleDownload}
            style={{
              backgroundColor: "#ff7a00",
              color: "#fff",
              border: "none",
              padding: "12px 28px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(255,122,0,0.3)",
              transition: "all 0.3s ease",
            }}
          >
            Download Ticket (PDF)
          </button>

          <button
            onClick={() => navigate("/home")}
            style={{
              backgroundColor: "#eee",
              color: "#333",
              border: "none",
              padding: "12px 28px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
