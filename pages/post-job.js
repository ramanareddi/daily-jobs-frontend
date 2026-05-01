import { useState } from "react";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !salary || !location) {
      alert("Please fill all fields");
      return;
    }

    const confirmPay = confirm(
      "Pay ₹99 via WhatsApp and then post job. Continue?"
    );

    if (!confirmPay) return;

    // Prepare message with job details
    const message = `Hi, I want to post a job:

📌 Title: ${title}
📍 Location: ${location}
💰 Salary: ₹${salary}/day`;

    // Open WhatsApp
    window.open(
      `https://wa.me/918465843887?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    alert("After payment confirmation, admin will post your job.");

    // Reset form
    setTitle("");
    setSalary("");
    setLocation("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Post a Job</h1>

      {/* 💰 Paid Notice */}
      <p style={{ color: "red", fontWeight: "bold" }}>
        ⚠️ Job posting is paid: ₹99 per job
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8, width: "250px" }}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Salary per day"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          style={{ padding: 8, width: "250px" }}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ padding: 8, width: "250px" }}
        />
        <br /><br />

        <button
          type="submit"
          style={{
            padding: 10,
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Post Job (₹99)
        </button>
      </form>
    </div>
  );
}