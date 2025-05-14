import React from 'react';
import { Pie } from 'react-chartjs-2';

export default function BudgetChart() {
  const data = {
    labels: ['Rent', 'Groceries', 'Utilities', 'Leisure'],
    datasets: [
      {
        data: [40, 30, 15, 15],
        backgroundColor: ['#6366f1', '#34d399', '#facc15', '#f87171'],
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Budget Breakdown</h3>
      <Pie data={data} />
    </div>
  );
}