import React, { useState, useEffect } from "react";
import AddTransaction from "./Components/AddTransaction";
import TransactionChart from "./Components/TransactionChart";
import Summary from "./Components/Summary";
import Login from "./Components/Login";
import Register from "./Components/Register";
import "./App.css";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const [transactions, setTransactions] = useState(() => {
    return user ? JSON.parse(localStorage.getItem(user.username)) || [] : [];
  });
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (user) {
      const savedData = JSON.parse(localStorage.getItem(user.username)) || [];
      setTransactions(savedData);
    }
  }, [user]);

  const addTransaction = (transaction) => {
    const updated = [transaction, ...transactions];
    setTransactions(updated);
    localStorage.setItem(user.username, JSON.stringify(updated));
  };

  const deleteTransaction = (id) => {
    const updated = transactions.filter((txn) => txn.id !== id);
    setTransactions(updated);
    localStorage.setItem(user.username, JSON.stringify(updated));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    // Ensure login background is set after logout
    document.body.classList.add("login-bg");
  };

  useEffect(() => {
    if (!user) {
      document.body.classList.add("login-bg");
    } else {
      document.body.classList.remove("login-bg");
    }
  }, [user]);

  if (!user) {
    return isRegistering ? (
      <Register setIsRegistering={setIsRegistering} />
    ) : (
      <Login setUser={setUser} setIsRegistering={setIsRegistering} />
    );
  }

  return (
    <div className="container">
  <div className="header-bar">
    <h1>💰 Money Manager</h1>

    {/* New Admin Button */}
    <button className="admin-btn" onClick={() => navigate("/admin")}>
      Admin
    </button>

    {/* Existing Logout Button */}
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  </div>


      <h1>
        Welcome, <span style={{ color: "#124cdeff" }}>{user.username}</span>!
      </h1>
      <Summary transactions={transactions} />
      <div className="main-content">
        <AddTransaction addTransaction={addTransaction} />
        <TransactionChart transactions={transactions} />
      </div>
    </div>
  );
}

export default App;