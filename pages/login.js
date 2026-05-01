import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Remove spaces
    const cleanPhone = phone.replace(/\D/g, "");

    // Basic validation
    if (!cleanPhone) {
      alert("Please enter phone number");
      return;
    }

    if (cleanPhone.length !== 10) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    // Save user in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        phone: cleanPhone,
        loginTime: new Date().toISOString()
      })
    );

    alert("Login successful!");
    router.push("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>

      <input
        type="tel"
        placeholder="Enter 10-digit phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{
          padding: 10,
          marginBottom: 10,
          width: "250px",
          borderRadius: 5,
          border: "1px solid #ccc"
        }}
      />

      <br />

      <button
        onClick={handleLogin}
        style={{
          padding: 10,
          background: "green",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer"
        }}
      >
        Login
      </button>
    </div>
  );
}