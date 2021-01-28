import request from "supertest"
import { app } from "./app"
import movies from "./data/movies.json"
import { createMovie, isMovie, Movie } from "./model"
import { copyObject } from "./utils"

let savedMovies: Movie[]
let savedId: number
let savedArchive: Movie[]
const saveMovies = () => {
    savedMovies = copyObject(movies.movieList)
}
const restoreMovies = () => {
    movies.movieList = copyObject(savedMovies)
}
const saveId = () => {
    savedId = movies.current_id
}
const restoreId = () => {
    movies.current_id = savedId
}
const saveArchive = () => {
    savedArchive = copyObject(movies.archive)
}
const restoreArchive = () => {
    movies.archive = copyObject(savedArchive)
}
const save = () => {
    saveMovies()
    saveId()
    saveArchive()
}
const restore = () => {
    restoreMovies()
    restoreId()
    restoreArchive()
}

const validConfig = { Accept: "application/json", rights: "3" }

describe("POST /add", () => {
    beforeEach(save)
    afterEach(restore)
    test("It should return a 401 error without the right authorizations", async () => {
        await request(app)
            .post("/add")
            .set({ Accept: "application/json" })
            .send({ uselessField: "uselessValue" })
            .expect(401)
    })
    test("It should return a 404 status when no movie field in body", async () => {
        await request(app)
            .post("/add")
            .set(validConfig)
            .send({ uselessField: "uselessValue" })
            .expect(404)
    })
    test("It should return a 415 error status when not good movie type", async () => {
        await request(app)
            .post("/add")
            .set(validConfig)
            .send({ movie: { title: "testAdd", director: "testAddDirector" } })
            .expect(415)
    })
    test("It should return a 201 created status with a movie when everything is correct", async () => {
        await request(app)
            .post("/add")
            .set(validConfig)
            .send({
                movie: {
                    title: "testAdd",
                    director: "testAddDirector",
                    genre: "testAddGenre",
                },
            })
            .expect(201)
    })
})

describe("GET /find/:title", () => {
    beforeEach(() => {
        save()
        createMovie({
            title: "testFindTitle",
            director: "testFindDirector",
            genre: "testFindGenre",
        })
    })
    afterEach(restore)
    test("It should return a 401 error without the right authorization", async () => {
        await request(app)
            .get("/find/testFindTitle")
            .set({ Accept: "application/json" })
            .expect(401)
    })
    test("It should return a movie", async () => {
        await request(app)
            .get("/find/testFindTitle")
            .set(validConfig)
            .expect(200)
            .then((result) => expect(isMovie(result.body)).toBe(true))
    })
    test("It should return a 404 error when it cannot find the movie", async () => {
        await request(app).get("/find/testWrongTitle").set(validConfig).expect(404)
    })
})

let tempMovie: Movie

describe("POST /archive/:id", () => {
    beforeEach(() => {
        save()
        tempMovie = createMovie({
            title: "testArchiveTitle",
            director: "testArchiveDirector",
            genre: "testArchiveGenre",
        })
    })
    afterEach(restore)
    test("It should return a 401 error without the right authorization", async () => {
        await request(app)
            .post("/archive/" + tempMovie.id)
            .set({ Accept: "application/json" })
            .expect(401)
    })
    test("It should return a 415 error with the wrong parameter", async () => {
        await request(app).post("/archive/badParam").set(validConfig).expect(415)
    })
    test("It should return a 304 error if the movie does not exist", async () => {
        await request(app).post("/archive/1000").set(validConfig).expect(304)
    })
    test("It should archive the movie and return a 204 success if everything is correct", async () => {
        await request(app)
            .post("/archive/" + tempMovie.id)
            .set(validConfig)
            .expect(204)
    })
})

describe("GET /get_movie/:id", () => {
    beforeEach(() => {
        save()
        tempMovie = createMovie({
            title: "testArchiveTitle",
            director: "testArchiveDirector",
            genre: "testArchiveGenre",
        })
    })
    afterEach(restore)
    test("It should return a 401 error without the right authorization", async () => {
        await request(app)
            .get("/get_movie/" + tempMovie.id)
            .set({ Accept: "application/json" })
            .expect(401)
    })
    test("It should return a 415 error with the wrong parameter", async () => {
        await request(app).get("/get_movie/badParam").set(validConfig).expect(415)
    })
    test("It should return a 404 error if the movie does not exist", async () => {
        await request(app).get("/get_movie/1000").set(validConfig).expect(404)
    })
    test("It should return the movie if everything is correct", async () => {
        await request(app)
            .get("/get_movie/" + tempMovie.id)
            .set(validConfig)
            .expect(200)
            .then((result) => expect(result.body).toEqual(tempMovie))
    })
})
