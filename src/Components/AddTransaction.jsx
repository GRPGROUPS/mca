import React, { useState } from "react";

function AddTransaction({ addTransaction }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0], // Always set current date
      type,
      amount: parseFloat(amount),
      category: type === "expense" ? category : undefined,
      note: type === "expense" ? note : undefined,
    };
    addTransaction(newTransaction);
    setAmount("");
    setNote("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{ marginBottom: "8px" }}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      {type === "expense" && (
        <>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Rent</option>
            <option>EMI</option>
            <option>Other</option>
          </select>
          <input
            type="text"
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </>
      )}
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTransaction;