const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const { readToken, createToken } = require("./tokenService");

const app = express();
app.use(cors({ credentials: true, origin: config.origin }));
app.use(cookieParser());
app.use(express.json());

app.get("/encryptUser", (req, res) => {
    const userString = req.params.user;
    if (userString) {
        try {
            const user = JSON.parse(userString);
            const token = createToken(user);
            res.status(200).send(token);
        } catch (_err) {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(404);
    }
});
app.get("/decryptUser", (req, res) => {
    const token = req.params.token;
    if (token) {
        try {
            const user = readToken(token);
            res.status(200).send(user);
        } catch (_err) {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

module.exports = app;
