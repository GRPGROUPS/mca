import React from "react";

function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="summary">
      <h1>Monthly Summary</h1>
      <p>Income: <span className="income">₹{income}</span></p>
      <p>Expenses: <span className="expense">₹{expense}</span></p>
      <p>Balance: <span className="balance">₹{balance}</span></p>
    </div>
  );
}

export default Summary;