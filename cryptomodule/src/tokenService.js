const jwt = require("jsonwebtoken");
const fs = require('fs');


const readFile = () => {
    try {
        const secret = fs.readFileSync("sym_keyfile.key", "utf8");
        return secret;
    } catch (_err) {
        console.error(
            "Unable to open the keyfile. Be sure you provided 'sym_keyfile.key' in the root folder of the crypto module."
        );
    }
};

exports.createToken = (user) => {
    try {
        const secret = readFile();
        const token = jwt.sign(user, secret, { algorithm: "HS256" });
        return token;
    } catch (_err) {
        console.error("Unable to sign the token.");
    }
};

exports.readToken = (token) => {
    try {
        const secret = readFile();
        jwt.verify(token, secret, (err, data) => {
            if (err) {
                throw new Error("Invalid token.");
            } else if (data) {
                console.log(JSON.stringify(data))
                return data;
            }
        });
    } catch (_err) {
        console.error("Unable to verify the token.");
    }
};