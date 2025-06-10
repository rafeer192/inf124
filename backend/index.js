const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { Server } = require("socket.io");
const express = require("express")
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const session = require("express-session");
const stockOwnershipRouter = require("./routers/stockOwnership.js");
const portfolioRouter = require("./routers/portfolioRouter.js");
const budgetRouter = require("./routers/budgetRouter.js")
const app = express();
const server = require("http").createServer(app);

// get info from React Front end on port 3000 or vercel website
const allowedOrigins = [
    process.env.CLIENT_ORIGIN,
    "http://localhost:3000"
].filter(Boolean); // Remove any undefined values

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: "true",
    },
});

app.use(helmet());
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

app.use(express.json());
app.use(session({ // create cookies so user doesn't have to relog when refreshing page
    secret: process.env.COOKIE_SECRET || "default_secret",
    credentials: true,
    name: "sid",
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
        httpOnly: true,
        expires: 1000 * 60 * 60 * 24 * 7, // 7 days
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
})
);

app.use("/auth", authRouter);
app.use("/api/stocks", stockOwnershipRouter);
app.use("/api/portfolio", portfolioRouter); 
app.use("/api/budget", budgetRouter);


io.on("connect", socket => {
    console.log("Socket connected");
});

// EXPRESS SERVER
server.listen(4000, () => {
    console.log("Server is listening on port 4000");
});

module.exports = app