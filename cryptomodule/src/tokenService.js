const jwt = require("jsonwebtoken");
const fs = require('fs');


const readFile = async () => {
    try {
        const secret = fs.readFileSync("sym_keyfile.key", "utf8");
        return secret;
    } catch (_err) {
        console.error(
            "Unable to open the keyfile. Be sure you provided 'sym_keyfile.key' in the root folder of the crypto module."
        );
    }
};

exports.createToken = async (user) => {
    try {
        const secret = await readFile();
        const token = jwt.sign(user, secret, { algorithm: "HS256" });
        return token;
    } catch (_err) {
        console.error("Unable to sign the token.");
    }
};

exports.readToken = async (token) => {
    try {
        const secret = await readFile();
        return jwt.verify(token, secret, (err, data) => {
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