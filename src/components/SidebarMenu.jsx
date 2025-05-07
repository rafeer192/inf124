import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SidebarMenu.css';

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="burger" onClick={() => setIsOpen(!isOpen)}>☰</div>
      {isOpen && (
        <nav>
          <Link to="/stocks">Stocks</Link>
          <Link to="/crypto">Crypto</Link>
          <Link to="/goal">Goals</Link>
          <Link to="/user/contact">Contact Us</Link>
        </nav>
      )}
    </div>
  );
}