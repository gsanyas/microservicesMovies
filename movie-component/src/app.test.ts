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
    test("It should return a 401 error without the right authorizations", () => {
        request(app)
            .post("/add")
            .set({ Accept: "application/json" })
            .send({ uselessField: "uselessValue" })
            .expect(401)
    })
    test("It should return a 404 status when no movie field in body", () => {
        request(app)
            .post("/add")
            .set(validConfig)
            .send({ uselessField: "uselessValue" })
            .expect(404)
    })
    test("It should return a 415 error status when not good movie type", () => {
        request(app)
            .post("/add")
            .set(validConfig)
            .send({ movie: { title: "testAdd", director: "testAddDirector" } })
            .expect(415)
    })
    test("It should return a 201 created status with a movie when everything is correct", () => {
        request(app)
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
    beforeAll(() => {
        save()
        createMovie({
            title: "testFindTitle",
            director: "testFindDirector",
            genre: "testFindGenre",
        })
    })
    afterAll(restore)
    test("It should return a 401 error without the right authorization", () => {
        request(app)
            .get("/find/testFindTitle")
            .set({ Accept: "application/json" })
            .expect(401)
    })
    test("It should return a movie", async () => {
        const result = await request(app)
            .get("/find/testFindTitle")
            .set(validConfig)
            .expect(200)
        expect(isMovie(result.body)).toBe(true)
    })
    test("It should return a 404 error when it cannot find the movie", () => {
        request(app).get("/find/testWrongTitle").set(validConfig).expect(404)
    })
})
