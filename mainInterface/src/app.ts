import express from "express"
import cors from "cors"
import axios from "axios"
import cookieParser from "cookie-parser"
import { checkToken } from "./filter"

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())

// LOGIN : it's a special request
app.get("/user/login/:address/:password", async (req, res) => {
    const URI =
        process.env.USER_COMPONENT_URI +
        "/login/" +
        req.params.address +
        "/" +
        req.params.password
    const userResponse = await axios.get(URI)
    if (userResponse.status !== 200) {
        res.sendStatus(userResponse.status)
    } else {
        const cryptoURI =
            process.env.CRYPTO_COMPONENT_URI +
            "/encryptUser/" +
            JSON.stringify(userResponse.data)
        const cryptoResponse = await axios.get(cryptoURI)
        if (cryptoResponse.status === 404) {
            res.status(502).send(
                "Error while creating your authentication token. Sorry for the inconvenience."
            )
        } else {
            res.status(200).send(cryptoResponse.data)
        }
    }
})

// SERVICE ADMIN requests

app.post("/add", checkToken, async (req, res) => {
    const URI = process.env.USER_COMPONENT_URI + "/add"
    const response = await axios.post(URI, req.body, {
        headers: { rights: req.headers.rights, accept: "application/json" },
    })
    if (response.status === 200 || response.status === 201) {
        res.status(response.status).send(response.data)
    } else {
        console.warn("Error in USER COMPONENT : " + response.statusText)
        res.sendStatus(502)
    }
})

app.post("/archive/:id", checkToken, async (req, res) => {
    const URI = process.env.USER_COMPONENT_URI + "/archive/" + req.params.id
    const response = await axios.post(URI, req.body, {
        headers: { rights: req.headers.rights, accept: "application/json" },
    })
    if (response.status === 200 || response.status === 204) {
        res.sendStatus(204)
    } else {
        console.warn("Error in USER COMPONENT : " + response.statusText)
        res.sendStatus(502)
    }
})

// CATALOG ADMIN REQUESTS

export { app }
