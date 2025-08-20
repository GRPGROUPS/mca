import React, { useState } from "react";

function Register({ setIsRegistering }) {
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !mobile || !password) {
      alert("All fields required");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.username === username)) {
      alert("Username already exists!");
      return;
    }
    const newUser = { username, mobile, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please login.");
    setIsRegistering(false); // Switch to login page
  };

  return (
    <div className="form">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={() => setIsRegistering(false)}>Login</button>
      </p>
    </div>
  );
}

export default Register;