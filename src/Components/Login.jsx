import React, { useState } from "react";

function Login({ setUser, setIsRegistering }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem("currentUser", JSON.stringify(existingUser));
      // Redirect to add transaction page (handled by App when user is set)
      // If you use React Router, use navigate("/add-transaction") here
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <button onClick={() => setIsRegistering(true)}>Register</button>
      </p>
    </div>
  );
}

export default Login;