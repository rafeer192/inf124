import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeaderBar.css';

export default function HeaderBar({ userName }) {
  const navigate = useNavigate();

  return (
    <header className="header-bar">
      <h2>Welcome, {userName}</h2>
      <div className="profile-icon" onClick={() => navigate('/profile')}>
        👤
      </div>
    </header>
  );
}