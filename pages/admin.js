import { useEffect, useState } from "react";
import axios from "axios";

export default function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get("https://daily-jobs-backend.onrender.com/applications")
      .then(res => setApplications(res.data || []))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Applications</h1>

      {applications.length === 0 && <p>No applications found</p>}

      {applications.map(app => (
        <div
          key={app.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 15,
            marginBottom: 15,
            background: "#f9f9f9",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          <h3 style={{ marginBottom: 10 }}>
            📌 {app.job_title || "Job Not Available"}
          </h3>

          <p>👤 <strong>Name:</strong> {app.user_name}</p>
          <p>📞 <strong>Phone:</strong> {app.user_phone}</p>

          <p style={{ fontSize: 12, color: "gray" }}>
            ⏱ {new Date(app.created_at).toLocaleString()}
          </p>

          {/* Quick WhatsApp contact */}
          <a
            href={`https://wa.me/91${app.user_phone}?text=Hi, regarding your job application`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: 10,
              padding: 6,
              background: "green",
              color: "white",
              borderRadius: 5,
              textDecoration: "none"
            }}
          >
            Contact on WhatsApp
          </a>
        </div>
      ))}
    </div>
  );
}