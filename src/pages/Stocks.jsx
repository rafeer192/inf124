import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import "../styles/Crypto.css";

const Stocks = () => {
    const navigate = useNavigate();
    const handleBuyClick = () => {
        navigate('/payment')
    }
    return (
        <div>
            <HeaderBar userName="Peter Anteater" /> 
            <div className="dashboard">
                <input type="text" placeholder="Search Stocks" className="search-bar" />
                <div className="info">
                    <h2>$Ticker Symbol, Stock Name</h2>
                    <p>Current price per share: <strong>$112.39</strong></p>
                </div>
                <div className="chart">
                    {/* Placeholder for chart */}
                    <div className="chart-placeholder">Price Trend Graph Coming Soon (when we have actual API data)</div>
                    <div className="timeframe-options">
                        <button>1D</button> <button>1W</button> <button>1M</button>
                        <button>YTD</button> <button>1Y</button> <button>All</button>
                    </div>
                </div>
                <div className="actions">
                    <button className="buy-button" onClick={handleBuyClick}>Trade this stock</button>
                </div>
                <div className="holdings">
                    <h3>Your Current Holdings</h3>
                    <p>100 AAPL</p>
                    <p>10 TSLA</p>
                    <p>5 QQQ</p>
                </div>

            </div>
        </div>
    
  );
};

export default Stocks;
