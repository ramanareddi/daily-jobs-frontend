import { useState } from "react";
import axios from "axios";

export default function AdminAddJob() {
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !salary || !location) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/post-job", {
        title,
        salary,
        location
      });

      alert("✅ Job added successfully");

      setTitle("");
      setSalary("");
      setLocation("");
    } catch (error) {
      console.log(error);
      alert("Error adding job");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin - Add Job</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br /><br />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}