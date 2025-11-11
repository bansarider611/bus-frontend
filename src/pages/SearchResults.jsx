import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchResults() {
  const navigate = useNavigate();

  // Search input form
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
  });

  // When user clicks Search
  const [searched, setSearched] = useState(false);

  // Store available buses after search
  const [availableBuses, setAvailableBuses] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!form.from || !form.to || !form.date) {
      alert("Please fill in all fields before searching.");
      return;
    }

    // Simulate API result for demo
    const sampleBuses = [
      {
        id: 1,
        name: "Express Bus",
        departure: "12:50",
        arrival: "17:45",
        fare: "₹50",
      },
      {
        id: 2,
        name: "Metro Travels",
        departure: "16:50",
        arrival: "18:40",
        fare: "₹130",
      },
      {
        id: 3,
        name: "CityLink",
        departure: "16:50",
        arrival: "17:45",
        fare: "₹87",
      },
      {
        id: 4,
        name: "Super Deluxe",
        departure: "14:30",
        arrival: "19:55",
        fare: "₹45",
      },
    ];

    // Show results
    setAvailableBuses(sampleBuses);
    setSearched(true);
  };

  const handleSeatSelection = (bus) => {
    navigate(`/select/${bus.id}`, { state: bus });
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "50px 8%",
      }}
    >
      {/* Page Title */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "700",
          color: "#222",
          marginBottom: "25px",
        }}
      >
        Search Bus
      </h1>

      {/* Search Section */}
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          name="from"
          placeholder="From"
          value={form.from}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="to"
          placeholder="To"
          value={form.to}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Search Bus
        </button>
      </form>

      {/* Show Results After Search */}
      {searched && (
        <>
          <div
            style={{
              marginBottom: "20px",
              textAlign: "center",
              color: "#444",
              fontSize: "16px",
            }}
          >
            Showing results for <b>{form.from}</b> → <b>{form.to}</b> on{" "}
            <b>{form.date}</b>
          </div>

          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                <th style={thStyle}>Bus Name</th>
                <th style={thStyle}>Departure</th>
                <th style={thStyle}>Arrival</th>
                <th style={thStyle}>Fare</th>
                <th style={thStyle}>Seats Left</th>
              </tr>
            </thead>
            <tbody>
              {availableBuses.map((bus) => (
                <tr key={bus.id} style={trStyle}>
                  <td style={tdStyle}>{bus.name}</td>
                  <td style={tdStyle}>{bus.departure}</td>
                  <td style={tdStyle}>{bus.arrival}</td>
                  <td style={tdStyle}>{bus.fare}</td>
                  <td style={tdStyle}>
                    <button
                      style={viewSeatButton}
                      onClick={() => handleSeatSelection(bus)}
                    >
                      View Seats
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

/* 🎨 CSS Styles */
const inputStyle = {
  padding: "10px 14px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "14px",
  outline: "none",
  width: "180px",
};

const buttonStyle = {
  backgroundColor: "#ff7a00",
  border: "none",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "6px",
  fontWeight: "600",
  fontSize: "15px",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(255,122,0,0.3)",
  transition: "all 0.3s ease",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
  borderRadius: "10px",
  overflow: "hidden",
};

const thStyle = {
  textAlign: "left",
  padding: "14px 20px",
  fontWeight: "600",
  color: "#333",
  borderBottom: "2px solid #eee",
};

const tdStyle = {
  padding: "14px 20px",
  color: "#444",
  borderBottom: "1px solid #eee",
  fontSize: "15px",
};

const trStyle = {
  backgroundColor: "#fff",
};

const viewSeatButton = {
  backgroundColor: "#ff7a00",
  color: "#fff",
  border: "none",
  padding: "8px 18px",
  borderRadius: "6px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "14px",
  transition: "all 0.3s ease",
};
