// 🚌 Mock list of available trips
const sampleTrips = [
  {
    id: 1,
    name: "Rajdhani Express",
    number: "RB-1201",
    from: "Ahmedabad",
    to: "Mumbai",
    depart: "07:30 AM",
    arrive: "01:45 PM",
    type: "AC Sleeper",
    fare: 850,
  },
  {
    id: 2,
    name: "Shree Travels",
    number: "ST-9982",
    from: "Ahmedabad",
    to: "Surat",
    depart: "09:15 AM",
    arrive: "01:30 PM",
    type: "Non-AC Seater",
    fare: 400,
  },
  {
    id: 3,
    name: "RedLine Express",
    number: "RL-4598",
    from: "Vadodara",
    to: "Rajkot",
    depart: "10:00 AM",
    arrive: "04:15 PM",
    type: "AC Seater",
    fare: 700,
  },
  {
    id: 4,
    name: "GreenBus Travels",
    number: "GB-7721",
    from: "Mumbai",
    to: "Pune",
    depart: "08:00 AM",
    arrive: "12:00 PM",
    type: "AC Sleeper",
    fare: 600,
  },
  {
    id: 5,
    name: "SRS Deluxe",
    number: "SR-1555",
    from: "Ahmedabad",
    to: "Udaipur",
    depart: "05:30 AM",
    arrive: "10:30 AM",
    type: "Non-AC Seater",
    fare: 350,
  },
];

// 🎟️ Mock booked seat data (for demo)
export const sampleBookedSeats = {
  1: [2, 5, 6, 15, 18, 31],
  2: [3, 4, 12, 16, 40],
  3: [9, 10, 11, 21, 22, 23],
  4: [1, 2, 8, 9, 33, 36],
  5: [7, 19, 20, 25, 44],
};

// 🔍 Fetch trips based on route and date
export async function fetchTrips(searchParams) {
  const { from, to } = searchParams;

  // Simulate a real network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Filter sample data
  const filtered = sampleTrips.filter(
    (t) =>
      t.from.toLowerCase().includes(from.toLowerCase()) &&
      t.to.toLowerCase().includes(to.toLowerCase())
  );

  return filtered;
}
