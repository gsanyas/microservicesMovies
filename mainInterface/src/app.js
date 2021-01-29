import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import axios from "axios"

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())

// LOGIN : it's a special request
app.get("/user/login/:address/:password", (req,res) => {
    const URI = process.env.USER_COMPONENT_URI + "/login/" + req.params.address + "/" + req.params.password
    const userResponse = await axios.get(URI)
    if (userResponse.status !== 200) {
        res.sendStatus(userResponse.status)
    } else {
        const cryptoURI = process.env.CRYPTO_COMPONENT_URI + "/encryptUser/" + JSON.stringify(userResponse.data)
        const cryptoResponse = await axios.get(cryptoURI)
        if (cryptoResponse.status === 404) {
            res.status(502).send("Error while creating your authentication token. Sorry for the inconvenience.")
        } else {
            res.status(200).send(cryptoResponse.data)
        }
    }
})

module.exports = app
