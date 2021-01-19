const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const config = require("./config.json");

const app = express();
app.use(cors({ credentials: true, origin: config.origin }));
app.use(cookieParser());
app.use(express.json());

const readFile = () => {
    try {
        const secret = fs.readFileSync("./sym_keyfile.key", "utf8");
        return secret;
    } catch (_err) {
        console.error(
            "Unable to open the keyfile. Be sure you provided 'sym_keyfile.key' in the root folder of the crypto module."
        );
    }
};

const createToken = (user) => {
    try {
        const secret = readFile();
        const token = jwt.sign(user, secret, { algorithm: "HS256" });
        return token;
    } catch (_err) {
        console.error("Unable to sign the token.");
    }
};

const readToken = (token) => {
    try {
        const secret = readFile();
        jwt.verify(token, secret, (err, data) => {
            if (err) {
                throw new Error("Invalid token.");
            } else if (data) {
                return data;
            }
        });
    } catch (_err) {
        console.error("Unable to verify the token.");
    }
};

app.get("/encryptUser", (req, res) => {
    const user = req.params.user;
    if (user) {
        const token = createToken(user);
        res.status(200).send(token);
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
