import express from "express"
import cors from "cors"
import axios from "axios"
import cookieParser from "cookie-parser"
import { checkToken } from "./filter"

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())

const cookieConfig = {
    httpOnly: false, // set true in final version, without the proxy
    // secure: true, // to force https (if you use it)
    maxAge: 1000000, // ttl in seconds (remove this option and cookie will die when browser is closed)
    signed: false, // the token is already signed
}

// LOGIN : it's a special request

app.post("/user/login", async (req, res) => {
    const URI = process.env.USER_COMPONENT_URI + "/login"
    const userResponse = await axios.post(URI, req.body, {
        headers: { accept: "application/json" },
    })
    if (userResponse.status !== 200) {
        res.status(502).send(
            "Error in user component: " +
                userResponse.status +
                " - " +
                userResponse.data
        )
    } else {
        const cryptoURI = process.env.CRYPTO_COMPONENT_URI + "/encryptUser"
        const cryptoResponse = await axios.put(cryptoURI, userResponse.data)
        if (cryptoResponse.status === 200) {
            res.status(200).send(cryptoResponse.data)
        } else {
            res.status(502).send(
                "Error while creating your authentication token. Sorry for the inconvenience."
            )
        }
    }
})

// CLIENT requests

app.get("/movie/find/:title", checkToken, async (req, res) => {
    const URI = process.env.CATALOG_COMPONENT_URI + "/find/" + req.params.title
    try {
        const response = await axios.get(URI, {
            headers: { rights: req.headers.rights, accept: "application/json" },
        })
        if (response.status === 200) {
            res.status(response.status).send(response.data)
        } else {
            res.status(502).send(response.statusText)
        }
    } catch (error) {
        res.status(502).send("Error in CATALOG COMPONENT : " + error)
    }
})

// SERVICE ADMIN requests

app.post("/user/add", checkToken, async (req, res) => {
    const URI = process.env.USER_COMPONENT_URI + "/add"
    const response = await axios.post(URI, req.body, {
        headers: { rights: req.headers.rights, accept: "application/json" },
    })
    if (response.status === 200 || response.status === 201) {
        res.status(response.status).send(response.data)
    } else {
        res.status(502).send(response.statusText)
    }
})

app.post("/user/archive/:id", checkToken, async (req, res) => {
    const URI = process.env.USER_COMPONENT_URI + "/archive/" + req.params.id
    const response = await axios.post(URI, req.body, {
        headers: { rights: req.headers.rights, accept: "application/json" },
    })
    if (response.status === 200 || response.status === 204) {
        res.sendStatus(204)
    } else {
        res.status(502).send(response.statusText)
    }
})

// CATALOG ADMIN requests

app.post("/movie/add", checkToken, async (req, res) => {
    const URI = process.env.CATALOG_COMPONENT_URI + "/add"
    const response = await axios.post(URI, req.body, {
        headers: { rights: req.headers.rights, accept: "application/json" },
    })
    if (response.status === 200 || response.status === 201) {
        res.status(response.status).send(response.data)
    } else {
        res.status(502).send(response.statusText)
    }
})

app.post("/movie/archive/:id", checkToken, async (req, res) => {
    const URI = process.env.CATALOG_COMPONENT_URI + "/archive/" + req.params.id
    const response = await axios.post(URI, req.body, {
        headers: { rights: req.headers.rights, accept: "application/json" },
    })
    if (response.status === 200 || response.status === 204) {
        res.sendStatus(204)
    } else {
        res.status(502).send(response.statusText)
    }
})

export { app }
