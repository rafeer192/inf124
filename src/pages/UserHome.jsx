import React from 'react';
import HeaderBar from '../components/HeaderBar';
import TipTile from '../components/TipTile';
import NewsTile from '../components/NewsTile';
import PortfolioChart from '../components/PortfolioChart';
import BudgetChart from '../components/BudgetChart';
import '../styles/UserHome.css';

export default function UserHome() {
  return (
    <div className="user-home-container">
      {/* for now, must change when backend is made  */}
      <HeaderBar userName="Peter Anteater" /> 
      <div className="main-content">
        <div className="left-column">
          <TipTile />
          <NewsTile />
        </div>
        <div className="right-column">
          <div className="chart-wrapper">
            <PortfolioChart />
          </div>
          <div className="chart-wrapper">
            <BudgetChart />
          </div>
        </div>
      </div>
    </div>
  );
}