import React, { useState, useEffect } from "react";
import { useBooking } from "../state/BookingContext";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const { user, currentBooking } = useBooking();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    // Simulate fetching previous bookings (replace with API call later)
    const stored = JSON.parse(localStorage.getItem("myBookings")) || [];

    // If there’s a current new booking, add it to the list
    if (currentBooking && !stored.find(b => b.id === currentBooking.id)) {
      stored.push(currentBooking);
      localStorage.setItem("myBookings", JSON.stringify(stored));
    }

    setBookings(stored);
  }, [user, currentBooking]);

  const handleCancel = (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("myBookings", JSON.stringify(updated));

    alert("Booking cancelled successfully!");
  };

  return (
    <div className="container card">
      <h2 style={{ textAlign: "center" }}>My Bookings</h2>

      {!user ? (
        <p style={{ textAlign: "center" }}>Please login to view your bookings.</p>
      ) : bookings.length === 0 ? (
        <p style={{ textAlign: "center" }}>You have no bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="trip-card">
            <div>
              <strong>{b.trip.name}</strong> <br />
              <span className="trip-meta">
                {b.trip.from} → {b.trip.to}
              </span>
              <br />
              <small>Seats: {b.seats.join(", ")} | Fare: ₹{b.fare}</small>
            </div>

            <div>
              <button
                className="btn small"
                style={{ background: "var(--danger)" }}
                onClick={() => handleCancel(b.id)}
              >
                Cancel
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
