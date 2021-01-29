import { checkRights } from "./filter"
import cors from "cors"
import express from "express"
import {
    createMovie,
    deleteMovie,
    findById,
    findByTitle,
    Movie,
    MovieAttributes,
    toMovieAttributes,
} from "./model"

const app = express()
app.use(cors({ origin: process.env.ORIGIN }))
// app.use(cors({ origin: config.origin }))
app.use(express.json())

app.post("/add", checkRights, (req, res) => {
    if (req.body && req.body.movie) {
        const movie: MovieAttributes = toMovieAttributes(req.body.movie)
        if (movie) {
            const data: Movie = createMovie(movie)
            res.status(201).json(data)
        } else {
            res.sendStatus(415)
        }
    } else {
        res.sendStatus(404)
    }
})

app.get("/find/:title", (req, res) => {
    const movie: Movie = findByTitle(req.params.title)
    if (movie) {
        res.status(200).json(movie)
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
        const hasChanged: boolean = deleteMovie(id)
        res.sendStatus(hasChanged ? 204 : 304)
    } else {
        res.sendStatus(415)
    }
})

app.get("/get_movie/:id", (req, res) => {
    const getId = (): number => {
        try {
            return parseInt(req.params.id)
        } catch (error) {
            return undefined
        }
    }
    const id = getId()
    if (id) {
        const movie: Movie = findById(id)
        if (movie) {
            res.status(200).json(movie)
        } else {
            res.sendStatus(404)
        }
    } else {
        res.sendStatus(415)
    }
})

export { app }
