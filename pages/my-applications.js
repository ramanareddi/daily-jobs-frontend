import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // If not logged in
    if (!user) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    // Fetch only this user's applications
    axios
      .get(`https://your-render-url.onrender.com/my-applications/${user.phone}`)
      .then(res => setApplications(res.data || []))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>My Applications</h1>

      {applications.length === 0 && (
        <p>No applications yet</p>
      )}

      {applications.map(app => (
        <div
          key={app.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: 10,
            padding: 10,
            borderRadius: 8
          }}
        >
          <h3>📌 {app.job_title}</h3>
          <p>📞 {app.user_phone}</p>
          <p style={{ fontSize: 12, color: "gray" }}>
            ⏱ {new Date(app.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}