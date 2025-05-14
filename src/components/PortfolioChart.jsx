import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

export default function PortfolioChart() {
  const data = {
    labels: ['Stocks', 'Crypto', 'Bonds', 'Cash'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#6b7280'],
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Portfolio Overview</h3>
      <Pie data={data} />
    </div>
  );
}