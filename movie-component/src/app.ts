import {
    archiveMovies,
} from "./service"
import { checkRights } from "./filter"
import cors from "cors"
import express from "express"
import { isArrayOfNumbers } from "./utils"
import { createMovie, findById, findByTitle, Movie, MovieAttributes, toMovieAttributes } from "./model"

const app = express()
app.use(cors())
// app.use(cors({ origin: config.origin }))
app.use(express.json())

app.post("/add", checkRights, async (req, res) => {
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

app.get("/find/:title", checkRights, (req, res) => {
    const movie: Movie = findByTitle(req.params.title)
    if (movie) {
        res.status(200).json(movie)
    } else {
        res.sendStatus(404)
    }
})

app.post("/archive", checkRights, async (req, res) => {
    if (req.body.movies) {
        if (isArrayOfNumbers(req.body.movies)) {
            await archiveMovies(req.body.movies)
            res.sendStatus(204)
        } else {
            res.sendStatus(415)
        }
    } else {
        res.sendStatus(404)
    }
})

app.get("/get_movie/:id", checkRights, (req, res) => {
    let id: number
    try {
        id = parseInt(req.params.id,10)
    } catch (error) {
        res.sendStatus(415)
    }
    const movie: Movie = findById(id)
    if (movie) {
        res.status(200).json(movie)
    } else {
        res.sendStatus(404)
    }
})

export { app }
