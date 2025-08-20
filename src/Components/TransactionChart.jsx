import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

function TransactionChart({ transactions }) {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((txn) => {
    if (txn.type === "income") {
      totalIncome += txn.amount;
    } else if (txn.type === "expense") {
      totalExpense += txn.amount;
    }
  });

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#28a745", "#dc3545"],
        borderRadius: 8,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Income vs Expense",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        title: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#eee" },
        title: { display: false },
      },
    },
  };

  return (
    <div
      className="chart-container"
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 24,
        margin: "24px 0",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        width: "600px", // Increased width
        height: "500px", // Increased height
      }}
    >
      <Bar data={data} options={options} width={550} height={400} />
    </div>
  );
}

export default TransactionChart;
