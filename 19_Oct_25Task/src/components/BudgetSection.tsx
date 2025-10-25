import React, { useState } from "react";

interface Props {
  budget: number;
  setBudget: (value: number) => void;
  balance: number;
}

const BudgetSection: React.FC<Props> = ({ budget, setBudget, balance }) => {
  const [input, setInput] = useState<string>(budget ? budget.toString() : "");

  const handleSetBudget = () => {
    if (!input || parseFloat(input) <= 0) {
      alert("Please enter a valid budget amount");
      return;
    }
    setBudget(parseFloat(input));
  };

  const handleDeleteBudget = () => {
    if (window.confirm("Are you sure to reset budget?")) {
      setBudget(0);
      setInput("");
    }
  };

  return (
    <div className="budget-box">
      <h2>Budget Section</h2>
      <input
        type="number"
        placeholder="Enter your monthly budget"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="budget-buttons">
        <button onClick={handleSetBudget}>Set / Update Budget</button>
        <button onClick={handleDeleteBudget} className="delete-btn">
          Delete Budget
        </button>
      </div>
      {budget > 0 && (
        <p>
          <strong>Budget:</strong> ₹{budget.toFixed(2)} |{" "}
          <strong>Remaining:</strong>{" "}
          <span style={{ color: balance < 0 ? "red" : "green" }}>
            ₹{balance.toFixed(2)}
          </span>
        </p>
      )}
    </div>
  );
};

export default BudgetSection;