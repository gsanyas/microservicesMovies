import { checkRights } from "./filter"
import cors from "cors"
import express from "express"
import {
    createUser,
    deleteUser,
    findById,
    findByAddress,
    User,
    UserAttributes,
    toUserAttributes,
} from "./model"

const app = express()
app.use(cors())
// app.use(cors({ origin: config.origin }))
app.use(express.json())

app.post("/add", checkRights, (req, res) => {
    if (req.body && req.body.user) {
        const user: UserAttributes = toUserAttributes(req.body.movie)
        if (user) {
            const data: User = createUser(user)
            res.status(201).json(data)
        } else {
            res.sendStatus(415)
        }
    } else {
        res.sendStatus(404)
    }
})

app.get("login/:address/:password", (req, res) => {
    const user: User = findByAddress(req.params.address)
    if (user) {
        if (user.password === req.params.password) {
            res.status(200).json(user)
        } else {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(404)
    }
})

app.post("/archive/:id", checkRights, (req, res) => {
    const getId = (): number => {
        try {
            return parseInt(req.params.id)
        } catch (error) {
            return undefined
        }
    }
    const id = getId()
    if (id) {
        const hasChanged: boolean = deleteUser(id)
        res.sendStatus(hasChanged ? 204 : 304)
    } else {
        res.sendStatus(415)
    }
})

app.get("/get_user/:id", (req, res) => {
    const getId = (): number => {
        try {
            return parseInt(req.params.id)
        } catch (error) {
            return undefined
        }
    }
    const id = getId()
    if (id) {
        const user: User = findById(id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.sendStatus(404)
        }
    } else {
        res.sendStatus(415)
    }
})

export { app }
