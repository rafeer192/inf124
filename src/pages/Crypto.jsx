import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import "../styles/Crypto.css";

const Crypto = () => {
    const navigate = useNavigate();
    const handleBuyClick = () => {
        navigate('/payment')
    }
    return (
        <div>
            <HeaderBar userName="Peter Anteater" /> 
            <div className="dashboard">
                <input type="text" placeholder="Search Crypto Coins" className="search-bar" />
                <div className="info">
                    <h2>$Ticker Symbol, Crypto Name</h2>
                    <p>Current price per token: <strong>$0.00134</strong></p>
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
                    <button className="buy-button" onClick={handleBuyClick}>Trade this token</button>
                </div>
                <div className="trending">
                    <h3>Trending Tokens</h3>
                    <ul>
                    <li>BTC</li><li>ETH</li><li>DOGE</li><li>SOL</li><li>DJT</li><li>MEL</li>
                    </ul>
                </div>
                <div className="holdings">
                    <h3>Your Current Holdings</h3>
                    <p>.02345 BTC ($1,245.37)</p>
                    <p>1 ETH ($1,586.03)</p>
                    <p>70000 DJT ($407.47)</p>
                </div>
            </div>
        </div>
    
  );
};

export default Crypto;
