import { useEffect, useState } from "react";
import axios from "axios";

export default function Applications() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://your-render-url.onrender.com/applications")
      .then(res => setData(res.data || []));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Applications</h1>

      {data.length === 0 && <p>No applications yet</p>}

      {data.map(app => (
        <div key={app.id} style={{border: "1px solid", margin: 10, padding: 10}}>
          <h3>{app.job_title}</h3>
          <p>Name: {app.user_name}</p>
          <p>Phone: {app.user_phone}</p>
        </div>
      ))}
    </div>
  );
}