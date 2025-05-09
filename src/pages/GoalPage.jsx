import React, { useState } from "react";
import HeaderBar from "../components/HeaderBar";

export default function GoalCustomizer() {
  const [category, setCategory] = useState("Financial goal");
  const [customCategory, setCustomCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [goals, setGoals] = useState([]);

  const finalCategory = category === "custom" ? customCategory : category;
  const validGoals = goals.filter((g) => g.text && g.text.trim() !== "");

  const handleSubmit = () => {
    if (!subject || !user || !date || !details) {
      alert("Please fill out all required fields.");
      return;
    }

    const newGoal = {
      text: `${subject} - ${finalCategory} - ${priority}`,
      completed: false,
    };

    setGoals([...goals, newGoal]);

    alert(`Your ${finalCategory} has been saved!`);

    // Reset form
    setSubject("");
    setUser("");
    setDate("");
    setDetails("");
    setPriority("Medium");
    setCategory("Financial goal");
    setCustomCategory("");
  };

  const toggleCompletion = (index) => {
    const updatedGoals = goals.map((goal, i) =>
      i === index ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);
  };

  return (
    <div>
      <HeaderBar userName="Peter Anteater" /> 
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Left: Form */}
        <div
          style={{
            flex: 1,
            padding: "1.5rem",
            boxSizing: "border-box",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "1rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Category Buttons */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
              {["Financial goal", "Personal goal", "custom"].map((value) => (
                  <button
                  key={value}
                  onClick={() => setCategory(value)}
                  style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      backgroundColor: category === value ? "green" : "#fff",
                      color: category === value ? "#fff" : "#000",
                      cursor: "pointer",
                      transition: "all 0.2s ease-in-out",
                  }}
                  >
                  {value === "custom" ? "Custom" : value.replace(" goal", "")}
                  </button>
              ))}
              
              {category === "custom" && (
                <input
                  type="text"
                  placeholder="Enter custom goal category"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  style={{ width: "100%", padding: "0.5rem" }}
                />
              )}
            </div>

            {/* Form Fields */}
            <input
              type="text"
              placeholder="What is your goal?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{ width: "97%", padding: "0.5rem", marginBottom: "0.5rem" }}
            />

            <input
              type="text"
              placeholder="Who is this goal for?"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              style={{ width: "97%", padding: "0.5rem", marginBottom: "0.5rem" }}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: "97%", padding: "0.5rem", marginBottom: "0.5rem" }}
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
            >
              <option value="High">Urgent</option>
              <option value="Medium">Long-Term</option>
              <option value="Low">Casual</option>
            </select>

            <textarea
              placeholder="Write your goal details here..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              style={{
                  width: "100%",
                  height: "200px", // or adjust to what looks good
                  padding: "1rem",
                  fontSize: "1rem",
                  resize: "vertical",
                  boxSizing: "border-box",
                  marginBottom: "1rem"
              }}
            />

            <button
              onClick={handleSubmit}
              style={{
                padding: "0.75rem",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Save Goal
            </button>
          </div>
        </div>

        {/* Right: Saved Goals */}
        <div
          style={{
            flex: 1,
            padding: "1.5rem",
            borderLeft: "1px solid #ddd",
            backgroundColor: "#f9f9f9",
            boxSizing: "border-box",
            overflowY: "auto",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Saved Goals</h2>
          {goals.length === 0 ? (
            <p style={{ color: "#999" }}>No goals yet.</p>
          ) : (
            <ul style={{ listStyleType: "none", padding: 0 }}>                
                  {validGoals.map((goal, index) => (
                  <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "0.75rem" }}>
                      <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => {
                          const originalIndex = goals.findIndex(g => g.text === goal.text);
                          toggleCompletion(originalIndex);
                      }}
                      style={{ marginRight: "0.5rem" }}
                      />
                      <span style={{ textDecoration: goal.completed ? "line-through" : "none" }}>
                      {goal.text}
                      </span>
                  </li>
                  ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
