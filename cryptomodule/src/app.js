const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { readToken, createToken } = require("./tokenService");

const app = express();
app.use(cors(process.env.ORIGIN));
app.use(cookieParser());
app.use(express.json());

app.put("/encryptUser", async (req, res) => {
    if (req.body) {
        try {
            const token = await createToken(req.body);
            res.status(200).send(token);
        } catch (_err) {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(404);
    }
});
app.put("/decryptUser", async (req, res) => {
    if (req.body && req.body.token) {
        try {
            const user = await readToken(req.body.token);
            res.status(200).send(user);
        } catch (_err) {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

module.exports = app;
