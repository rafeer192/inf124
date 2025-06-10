const express = require("express");
const router = express.Router();
const db = require("../db"); // pg client setup

router.post("/", async (req, res) => {
  try {
    const { userId, subject, category, priority, notes, deadline } = req.body;

    if (!userId || !subject || !deadline) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await db.query(
      `INSERT INTO goals (user_id, subject, category, priority, notes, deadline)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, subject, category, priority, notes, deadline]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error saving goal:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
