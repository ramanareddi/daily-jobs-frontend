import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // ✅ search states
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // ✅ NEW: Language state
  const [language, setLanguage] = useState("te-IN");

  // ✅ Get logged-in user
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);
  }, []);

  // ✅ Fetch jobs
  useEffect(() => {
    axios.get("https://your-render-url.onrender.com/jobs")
      .then(res => {
        setJobs(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setJobs([]);
        setLoading(false);
      });
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out");
    window.location.reload();
  };

  // ✅ Apply job
  const applyJob = async (jobId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    try {
      await axios.post("https://your-render-url.onrender.com/apply", {
        job_id: jobId,
        user_name: "User",
        user_phone: user.phone,
        job_title: jobs.find(j => j.id === jobId)?.title
      });

      alert("Applied successfully!");
    } catch (error) {
      console.log(error);
      alert("Error applying job");
    }
  };

  // ✅ WhatsApp + save user
  const handleWhatsApp = async () => {
    const phone = prompt("Enter your WhatsApp number:");
    const location = prompt("Enter your area (Whitefield, Marathahalli, etc):");

    if (!phone || !location) {
      alert("Enter all details");
      return;
    }

    try {
      await axios.post("https://your-render-url.onrender.com/save-user", {
        phone,
        location
      });

      window.open(
        "https://wa.me/918465843887?text=Hi%20I%20want%20daily%20job%20alerts",
        "_blank"
      );

    } catch (error) {
      console.log(error);
      alert("Error saving user");
    }
  };

  // 🎤 VOICE SEARCH FUNCTION (MULTI-LANGUAGE)
  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();

    // ✅ Dynamic language
    recognition.lang = language;

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;

      alert("You said: " + text);

      try {
        const res = await axios.post("https://your-render-url.onrender.com/voice-search", {
          text
        });

        setJobs(res.data || []);
      } catch (error) {
        console.log(error);
        alert("Voice search error");
      }
    };

    recognition.start();
  };

  // ✅ FILTER LOGIC
  const filteredJobs = jobs.filter(job => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      job.location.toLowerCase().includes(locationFilter.toLowerCase())
    );
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>Daily Jobs</h1>

      {/* 🔥 Buttons Section */}
      <div style={{ marginBottom: 20 }}>

        {!user ? (
          <Link href="/login">
            <button style={{ marginRight: 10 }}>Login</button>
          </Link>
        ) : (
          <>
            <span style={{ marginRight: 10 }}>
              👤 {user.phone}
            </span>

            <button onClick={handleLogout} style={{ marginRight: 10 }}>
              Logout
            </button>
          </>
        )}

        <Link href="/post-job">
          <button style={{ marginRight: 10 }}>Post a Job</button>
        </Link>

        <Link href="/applications">
          <button style={{ marginRight: 10 }}>Admin</button>
        </Link>

        <Link href="/my-applications">
          <button style={{ marginRight: 10 }}>My Applications</button>
        </Link>

        <Link href="/admin-add-job">
          <button style={{ marginRight: 10 }}>Add Job (Admin)</button>
        </Link>

        {/* 🌍 LANGUAGE SELECT */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ marginRight: 10, padding: 5 }}
        >
          <option value="te-IN">Telugu</option>
          <option value="hi-IN">Hindi</option>
          <option value="ta-IN">Tamil</option>
          <option value="kn-IN">Kannada</option>
          <option value="en-IN">English</option>
        </select>

        {/* 🎤 VOICE BUTTON */}
        <button
          onClick={startVoice}
          style={{
            marginRight: 10,
            background: "orange",
            color: "white",
            padding: 6,
            border: "none",
            cursor: "pointer"
          }}
        >
          🎤 Speak Job
        </button>

        {/* WhatsApp */}
        <button
          onClick={handleWhatsApp}
          style={{
            background: "green",
            color: "white",
            padding: 6,
            border: "none",
            cursor: "pointer"
          }}
        >
          Get Job Alerts 📲
        </button>
      </div>

      {/* 🔍 SEARCH + FILTER */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Search job (e.g. delivery)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: 10, padding: 5 }}
        />

        <input
          placeholder="Location (e.g. Whitefield)"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          style={{ padding: 5 }}
        />
      </div>

      {/* Loading */}
      {loading && <p>Loading jobs...</p>}

      {/* No jobs */}
      {!loading && filteredJobs.length === 0 && (
        <p>No jobs found</p>
      )}

      {/* Jobs list */}
      {filteredJobs.map(job => (
        <div
          key={job.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10
          }}
        >
          <h3>{job.title}</h3>
          <p>📍 {job.location}</p>
          <p>💰 ₹{job.salary}/day</p>

          <button
            onClick={() => applyJob(job.id)}
            style={{
              marginTop: 10,
              padding: 6,
              background: "blue",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Apply Now
          </button>
        </div>
      ))}
    </div>
  );
}