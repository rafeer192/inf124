const express = require("express");
const validateForm = require ("../controllers/validateform");
const router = express.Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");

router
    .route("/login") // Input from Login page
    .get(async (req, res) => {
        if (req.session.user && req.session.user.email) {
            res.status(200).json({ // Ok
                loggedIn: true, 
                email: req.session.user.email,
                firstName: req.session.user.firstName,  
                lastName: req.session.user.lastName,
            });
        } 
        else { // Not authorized
            res.status(401).json({ loggedIn: false });
        }
    })
    .post(async (req, res) => {
        validateForm(req, res);

        const potentialLogin = await pool.query( // get email from login
            "SELECT id, email, passhash, first_name, last_name FROM users u WHERE u.email=$1",
            [req.body.email]
        );

        if (potentialLogin.rowCount > 0) {
            const isSamePass = await bcrypt.compare( // check if right password
                req.body.password,
                potentialLogin.rows[0].passhash // compares encrypted password in db
            );
            if (isSamePass) { // login 
                req.session.user = {
                    email: req.body.email,
                    id: potentialLogin.rows[0].id,
                    firstName: potentialLogin.rows[0].first_name,
                    lastName: potentialLogin.rows[0].last_name
                };

                res.status(200).json({ 
                    loggedIn: true, 
                    email: potentialLogin.rows[0].email,
                    firstName: potentialLogin.rows[0].first_name,
                    lastName: potentialLogin.rows[0].last_name
                });
            }
            else { // not good login
                res.status(401).json({ loggedIn: false, status: "Wrong email or password" });
                console.log("not good login");
            }
        }  
        else {
            console.log("not good no user");
            res.status(401).json({ loggedIn: false, status: "Wrong email or password" });
        }
    });

router.post("/register", async (req, res) => {
    try {
        validateForm(req, res);

        const existingUser = await pool.query(
            "SELECT email from users WHERE email=$1",
            [req.body.email]
        );

        if (existingUser.rowCount === 0) {
            const hashedPass = await bcrypt.hash(req.body.password, 10);
            const newUserQuery = await pool.query(
                "INSERT INTO users(email, passhash, first_name, last_name, state_name) values ($1, $2, $3, $4, $5) RETURNING id, email",
                [req.body.email, hashedPass, req.body.firstName, req.body.lastName, req.body.state]
            );

            req.session.user = {
                email: req.body.email,
                id: newUserQuery.rows[0].id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                state: req.body.state
            };

            res.status(200).json({
                loggedIn: true, 
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                state: req.body.state
            });
        } else {
            res.status(401).json({loggedIn: false, status: "email taken"});
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            loggedIn: false,
            status: "Server error during registration",
            error: error.message
        });
    }
});

module.exports = router;