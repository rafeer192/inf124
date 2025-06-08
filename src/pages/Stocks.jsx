import React, { useState, useEffect, useContext } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import HeaderBar from "../components/HeaderBar";
import "../styles/Crypto.css";
import { AccountContext } from "../components/AccountContext";

const API_KEY = "74a27c82d2a74e1b8544353c5b66ddd3";

const Stocks = ({ customHoldings, setCustomHoldings }) => {
  const [searchInput, setSearchInput] = useState("");
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [stockData, setStockData] = useState([]);
  const [metaData, setMetaData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [newSymbol, setNewSymbol] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newNote, setNewNote] = useState("");
  const [companySuggestions, setCompanySuggestions] = useState([]);
  
  // personal info from db
  const { user } = useContext(AccountContext);
  const fullName = `${user?.firstName} ${user?.lastName}`;

  const fetchCompanySuggestions = async (query) => {
    if (!query) {
      setCompanySuggestions([]);
      return;
    }
  
    try {
      const res = await fetch(
        `https://api.twelvedata.com/symbol_search?symbol=${query}&apikey=${API_KEY}`
      );
      const data = await res.json();
  
      if (data?.data) {
        const input = query.toUpperCase();
  
        const cleanSuggestions = data.data
          .filter(item =>
            item.symbol &&
            item.symbol.toUpperCase().startsWith(input) &&
            item.exchange &&                         // ensures it’s from a known exchange
            /^[A-Z]+$/.test(item.symbol)             // filters out weird/international formats
          )
          .map(item => ({ symbol: item.symbol.toUpperCase() }));
  
        // Remove duplicates
        const seen = new Set();
        const uniqueSuggestions = cleanSuggestions.filter(item => {
          if (seen.has(item.symbol)) return false;
          seen.add(item.symbol);
          return true;
        });
  
        setCompanySuggestions(uniqueSuggestions.slice(0, 5));
      } else {
        setCompanySuggestions([]);
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setCompanySuggestions([]);
    }
  };
  
  
  useEffect(() => {
    fetchStockData(stockSymbol);
  }, [stockSymbol]);

  const fetchStockData = async (symbol) => {
    setErrorMessage("");
    try {
        // Get time series data
        const timeRes = await fetch(
        `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=30&apikey=${API_KEY}`
        );
        const timeData = await timeRes.json();
        if (timeData.status === "error") {
            setErrorMessage(timeData.message || "Error fetching stock data.");
            setStockData([]);
            setMetaData(null);
            return;
        }
        const chartData = timeData.values.reverse().map((entry) => ({
            date: entry.datetime,
            price: parseFloat(entry.close),
        }));
        setStockData(chartData);

        const quoteRes = await fetch(
            `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`
        );
        const quoteData = await quoteRes.json();
        console.log(quoteData);

        setMetaData({
            name: quoteData.name,
            exchange: quoteData.exchange,
            currency: quoteData.currency,
        });
    } catch (error) {
        setErrorMessage("Network error. Please try again later.");
        console.error("Fetch error:", error);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchInput.trim() !== '') {
      setStockSymbol(searchInput.toUpperCase());
      setSearchInput("");
    }
  };

  return (
    <div>
      <HeaderBar userName={fullName} />
      <div className="dashboard">
        <label htmlFor='searchStock'>Search Stock</label>
        <input
          id='searchStock'
          type="text"
          placeholder="Search Stocks (e.g., AAPL)"
          className="search-bar"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearch}
        />
        <div className="info">
            <h2>{metaData ? `${metaData.name} (${stockSymbol})` : stockSymbol}</h2>
            {stockData.length > 0 && (
            <p>Latest closing price: <strong>${stockData[stockData.length - 1].price.toFixed(2)}</strong></p>
            )}
            {metaData && (
            <>
                <p>Exchange: {metaData.exchange}</p>
                <p>Currency: {metaData.currency}</p>
            </>
            )}
        </div>
        <div className="chart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stockData}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <CartesianGrid stroke="#ccc" />
              <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="holdings">
          <h3>Your Current Holdings</h3>
          <p>100 AAPL</p>
          <p>10 TSLA</p>
          <p>5 QQQ</p>
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
            My Holding
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

            <h2>Add or View Holding</h2>

        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="text"
            placeholder="Enter stock symbol (e.g., AAPL)"
            value={searchInput}
            onChange={(e) => {
              const val = e.target.value;
              setSearchInput(val);
              setNewSymbol(val);
              fetchCompanySuggestions(val);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setStockSymbol(searchInput.toUpperCase());
                setCompanySuggestions([]);
              }
            }}
            style={{
              padding: "0.5rem",
              fontSize: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",          
              boxSizing: "border-box",
              display: "block",
            }}
          />

          {companySuggestions.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                zIndex: 1000,
                listStyle: "none",
                margin: 0,
                padding: 0,
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {companySuggestions.map((item) => (
                <li
                  key={item.symbol}
                  onClick={() => {
                    setStockSymbol(item.symbol);
                    setNewSymbol(item.symbol); 
                    setSearchInput(item.symbol);
                    setCompanySuggestions([]);
                  }}
                  
                  style={{
                    padding: "0.5rem",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {item.symbol}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="number"
          placeholder="Enter amount you own"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

            <textarea
              placeholder="Notes or expectations (optional)"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
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
                if (newSymbol && newAmount) {
                  const symbol = newSymbol.toUpperCase();
              
                  try {
                    const quoteRes = await fetch(
                      `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`
                    );
                    const quoteData = await quoteRes.json();
              
                    if (!quoteData.close || quoteData.status === "error") {
                      alert("Failed to fetch price for symbol: " + symbol);
                      return;
                    }
              
                    setCustomHoldings([
                      ...customHoldings,
                      {
                        symbol,
                        amount: newAmount,
                        note: newNote,
                        price: parseFloat(quoteData.close),
                      },
                    ]);
              
                    setNewSymbol("");
                    setNewAmount("");
                    setNewNote("");
                  } catch (error) {
                    alert("Error fetching stock data. Please try again.");
                    console.error(error);
                  }
                }
              }}

              style={{
                marginTop: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "1rem",
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

            
            <button onClick={() => setShowModal(false)} style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              alignSelf: "flex-end"
            }}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Stocks;
