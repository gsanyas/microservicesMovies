import { addMovies } from "./movieService"
import { checkRights } from "./filter"
import cors from "cors"
import config from "../config.json"
import express from "express"

const app = express()
app.use(cors({ origin: config.origin }))
app.use(express.json())

app.post("/add", checkRights, (req, res) => {
    if (req.body.movies) {
        const data = addMovies(req.body.movies)
        res.status(200).json(data)
    }
})

app.get("/", (_req, res) => res.status(200).json({ valid: true }))

export { app }
