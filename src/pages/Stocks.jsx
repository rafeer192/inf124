import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import HeaderBar from "../components/HeaderBar";
import "../styles/Crypto.css";

const API_KEY = "74a27c82d2a74e1b8544353c5b66ddd3";

const Stocks = () => {
  const [searchInput, setSearchInput] = useState("");
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [stockData, setStockData] = useState([]);
  const [metaData, setMetaData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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
      <HeaderBar userName="Peter Anteater" />
      <div className="dashboard">
        <input
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
        </div>
      </div>
    </div>
  );
};

export default Stocks;
