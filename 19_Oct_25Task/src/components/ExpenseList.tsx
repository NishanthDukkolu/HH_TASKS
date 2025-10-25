import React from "react";
import { Expense } from "../App";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";


interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList: React.FC<Props> = ({ expenses, onDelete }) => {
  if (expenses.length === 0) return <p>No expenses yet.</p>;

  return (
    <ul className="list">
      {expenses.map((exp) => (
        <li key={exp.id} className="item">
          <div>
            <strong>{exp.title}</strong> - ₹{exp.amount} <br />
            <small>{new Date(exp.date).toLocaleDateString()}</small>
          </div>
          <button onClick={() => onDelete(exp.id)}><AiFillDelete/></button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
