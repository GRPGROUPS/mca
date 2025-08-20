import React from "react";

function TransactionList({ transactions, deleteTransaction }) {
  return (
    <div className="list">
      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        <ul>
          {transactions.map((t) => (
            <li key={t.id} className={t.type}>
              <span>
                {t.type === "income" ? "+" : "-"}₹{t.amount} {t.category && `(${t.category})`}
                {t.note && ` - ${t.note}`}
              </span>
              {t.type === "income" && (
                <button
                  style={{
                    background: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "4px 10px",
                    cursor: "pointer",
                    marginLeft: "10px"
                  }}
                  onClick={() => deleteTransaction(t.id)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;