const express = require("express");
const validateForm = require ("../controllers/validateform");
const router = express.Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");

router
    .route("/login")
    .get(async (req, res) => {
        if (req.session.user && req.session.user.email) {
            res.status(200).json({ loggedIn: true, email: req.session.user.email });
        } 
        else {
            res.status(401).json({ loggedIn: false });
        }
    })
    .post(async (req, res) => {
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
                req.session.user = {
                    email: req.body.email,
                    id: potentialLogin.rows[0].id,
                };

                res.status(200).json({ loggedIn: true, email: req.body.email });
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
    validateForm(req, res);

    const existingUser = await pool.query(
        "SELECT email from users WHERE email=$1",
        [req.body.email]
    );

    if (existingUser.rowCount === 0) {
        //register
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newUserQuery = await pool.query(
            "INSERT INTO users(email, passhash) values ($1, $2) RETURNING id, email",
            [req.body.email, hashedPass]
        );

        req.session.user = {
            email: req.body.email,
            id: newUserQuery.rows[0].id,
        };

        res.status(200).json({loggedIn: true, email: req.body.email});
    }
    else {
        res.status(401).json({loggedIn: false, status: "email taken"});
    }
});

module.exports = router;