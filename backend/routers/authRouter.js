const express = require("express");
const validateForm = require ("../controllers/validateform");
const router = express.Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");

router.post("/login", async(req, res) => {
    validateForm(req, res);

    const potentialLogin = await pool.query(
        "SELECT id, email, passhash FROM users u WHERE u.email=$1",
        [req.body.email]
    );

    if (potentialLogin.rowCount > 0) {
        const isSamePass = await bcrypt.compare(
            req.body.password,
            potentialLogin.rows[0].passhash
        );
        if (isSamePass) { // login 
            request.session.user = {
                email: req.body.email,
                id: potentialLogin.rows[0].id,
            };

            res.json({loggedIn: true, email: req.body.email})
        }
        else { // not good login
            res.json({ loggedIn: false, status: "Wrong email or password"});
            console.log("not good")
        }
    }
    else {
        console.log("not good")
        res.json({ loggedIn: false, status: "Wrong email or password"});
    }
});

router.post("/register", async (req, res) => {
    validateForm(req, res);

    const existingUser = await pool.query(
        "SELECT email from users where email=$1",
        [req.body.email]
    );

    if (existingUser.rowCount === 0) {
        //register
        const hashedPass = await bcrypt.hash.apply(req.body.password, 10);
        const newUserQuery = await pool.query(
            "INSERT INTO users(email, passhash) values (test, test) RETURNING email",
            [req.body.emailm, hashedPass]
        );

        request.session.user = {
            email: req.body.email,
            id: newUserQuery.rows[0].id,
        };

        res.json({loggedIn: true, email: req.body.email});
    }
    else {
        res.json({loggedIn: false, status: "email taken"});
    }
});

module.exports = router;