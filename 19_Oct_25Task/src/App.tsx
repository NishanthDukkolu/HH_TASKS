import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import BudgetSection from "./components/BudgetSection";

export interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
}

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState<number>(() => {
    const saved = localStorage.getItem("budget");
    return saved ? JSON.parse(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  const addExpense = (expense: Expense) => {
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = budget - total;

  return (
    <div className="container">
      <h1>Monthly Expense Tracker</h1>

      <BudgetSection
        budget={budget}
        setBudget={setBudget}
        balance={balance}
      />

      <ExpenseForm onAdd={addExpense} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />

      <h3>Total Expenses: ₹{total.toFixed(2)}</h3>
      <h3>Remaining Balance: ₹{balance.toFixed(2)}</h3>
    </div>
  );
};

export default App;