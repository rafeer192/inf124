// server.js or routes/stockOwnership.js
const express = require("express");
const router = express.Router();
const pool = require("./db"); // your PostgreSQL pool connection
const authenticate = require("./middleware/authenticate"); // your auth middleware

// Middleware to get userId from auth (for example)
router.use(authenticate);

// Get all holdings for logged in user
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT ticker, amountowned, notes FROM stockOwnership WHERE userid = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Add a new holding or update existing holding for user
router.post("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const { ticker, amountowned, notes } = req.body;

    // Upsert logic: insert or update if exists
    await pool.query(
      `INSERT INTO stockOwnership(userid, ticker, amountowned, notes)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (userid, ticker)
       DO UPDATE SET amountowned = EXCLUDED.amountowned, notes = EXCLUDED.notes`,
      [userId, ticker, amountowned, notes]
    );

    res.status(201).send("Holding added/updated");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Delete a holding
router.delete("/:ticker", async (req, res) => {
  try {
    const userId = req.user.id;
    const ticker = req.params.ticker;

    await pool.query(
      "DELETE FROM stockOwnership WHERE userid = $1 AND ticker = $2",
      [userId, ticker]
    );
    res.send("Holding deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
