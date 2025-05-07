import React from 'react';
import HeaderBar from '../components/HeaderBar';
import SidebarMenu from '../components/SidebarMenu';
import TipTile from '../components/TipTile';
import NewsTile from '../components/NewsTile';
import PortfolioChart from '../components/PortfolioChart';
import BudgetChart from '../components/BudgetChart';
import '../styles/UserHome.css';

export default function UserHome() {
  return (
    <div className="user-home-container">
      <HeaderBar userName="Rafee" />
      <div className="main-content">
        <SidebarMenu />
        <div className="left-column">
          <TipTile />
          <NewsTile />
        </div>
        <div className="right-column">
          <PortfolioChart />
          <BudgetChart />
        </div>
      </div>
    </div>
  );
}