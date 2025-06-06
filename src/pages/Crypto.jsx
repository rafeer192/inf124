import React, { useState, useContext } from "react"; 
// import { useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import "../styles/Crypto.css";
import { AccountContext } from '../components/AccountContext';

const Crypto = () => {
    // const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [customHoldings, setCustomHoldings] = useState([]);
    const [symbol, setSymbol] = useState("");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");

    // personal info from db
    const { user } = useContext(AccountContext);
    const fullName = `${user?.firstName} ${user?.lastName}`;

    return (

        <div>
            <HeaderBar userName={fullName} />
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
                    <button
                        style={{
                        marginTop: "1rem",
                        padding: "0.5rem 1rem",
                        backgroundColor: "#4caf50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        }}
                        onClick={() => setShowModal(true)}
                    >
                        My Crypto Holding
                    </button>
                </div>
            </div>
        {showModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "8px",
            width: "600px",
            maxWidth: "90vw",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}>
            <h2>Add Crypto Holding</h2>
            <input
              type="text"
              placeholder="Enter crypto symbol (e.g., BTC)"
              value={symbol.replace("/USD", "")}
              onChange={(e) => setSymbol(`${e.target.value.toUpperCase()}/USD`)}
              style={{
                padding: "0.5rem",
                fontSize: "1rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="number"
              placeholder="Enter amount you own"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                padding: "0.5rem",
                fontSize: "1rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <textarea
              placeholder="Notes or expectations (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              style={{
                padding: "0.5rem",
                fontSize: "1rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                resize: "vertical",
              }}
            />
            <button
              onClick={async () => {
                if (symbol && amount) {
                  try {
                    const quoteRes = await fetch(
                      `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`
                    );
                    const quoteData = await quoteRes.json();

                    if (!quoteData || !quoteData.close || quoteData.status === "error") {
                      alert("Failed to fetch price for symbol: " + symbol);
                      return;
                    }

                    setCustomHoldings([
                      ...customHoldings,
                      {
                        symbol,
                        amount,
                        note,
                        price: parseFloat(quoteData.close),
                      },
                    ]);
                    setSymbol("BTC/USD");
                    setAmount("");
                    setNote("");
                    setShowModal(false);
                  } catch (error) {
                    alert("Error fetching crypto data. Please try again.");
                    console.error(error);
                  }
                }
              }}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                alignSelf: "flex-end",
              }}
            >
              Submit
            </button>
            <div style={{ marginTop: "0rem", width: "100%" }}>
              <h4>Your Current Holdings:</h4>

              {/* Column headers */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  borderBottom: "2px solid #ccc",
                  paddingBottom: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ width: "33%" }}>Company</span>
                <span style={{ width: "33%", textAlign: "center" }}>Last Price</span>
                <span style={{ width: "33%", textAlign: "right" }}>Your Holding</span>
              </div>

              {/* Scrollable list container */}
              <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {customHoldings.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.5rem 0",
                        borderBottom: "1px solid #eee",
                        fontSize: "1rem",
                      }}
                    >
                      <span style={{ width: "33%" }}>{item.symbol}</span>
                      <span style={{ width: "33%", textAlign: "center" }}>
                        {item.price ? `$${item.price.toFixed(2)}` : "–"}
                      </span>
                      <span style={{ width: "33%", textAlign: "right" }}>
                        ${parseFloat(item.amount).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <button
              onClick={() => setShowModal(false)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                alignSelf: "flex-end",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Crypto;