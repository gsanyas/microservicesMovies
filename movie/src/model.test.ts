import * as request from "supertest"
import {
    createMovie,
    deleteMovie,
    equalMovie,
    findById,
    findByTitle,
    Movie,
    MovieAttributes,
} from "./model"
import movies from "./data/movies.json"
import { copyArray } from "./utils"

const defaultMovieList: Movie[] = copyArray(movies.movieList)
const defaultId: number = movies.current_id
const defaultArchive: Movie[] = copyArray(movies.archive)

const movieAttributes: MovieAttributes = {
    title: "TestTitle",
    director: "TestDirector",
    genre: "TestGenre",
}

const movieFake: Movie = {
    title: "fakeTitle",
    director: "fakeDirector",
    genre: "fakeGenre",
    id: -1,
}

const resetData = () => {
    movies.movieList = copyArray(defaultMovieList)
    movies.current_id = defaultId
    movies.archive = copyArray(defaultArchive)
}

describe("CreateMovie", () => {
    beforeEach(resetData)
    afterEach(resetData)
    test("It creates a movie", () => {
        const length = movies.movieList.length
        const result = createMovie(movieAttributes)
        expect(result).toBeDefined()
        expect(result.title).toEqual(movieAttributes.title)
        expect(result.director).toEqual(movieAttributes.director)
        expect(result.genre).toEqual(movieAttributes.genre)
        expect(result.id).toBeDefined()
        expect(movies.movieList.length).toEqual(length + 1)
    })
    test("It returns undefined", () => {
        createMovie(movieAttributes)
        const length = movies.movieList.length
        const result = createMovie(movieAttributes)
        expect(result).toBeUndefined()
        expect(length).toEqual(movies.movieList.length)
    })
})

describe("findByTitle", () => {
    beforeEach(resetData)
    afterEach(resetData)
    test("It returns undefined when a movie does not exists", () => {
        const result = findByTitle(movieAttributes.title)
        expect(result).toBeUndefined()
    })
    test("It returns a movie when it exists", () => {
        createMovie(movieAttributes)
        const result = findByTitle(movieAttributes.title)
        expect(result).toBeDefined()
        expect(result.title).toEqual(movieAttributes.title)
    })
})

describe("deleteMovie", () => {
    beforeEach(resetData)
    afterEach(resetData)
    test("It deletes a movie that exists", () => {
        const movie = createMovie(movieAttributes)
        const lengthList = movies.movieList.length
        const lengthArchive = movies.archive.length
        deleteMovie(movie)
        const inMovieList = findById(movie.id)
        expect(inMovieList).toBeUndefined()
        const inArchive = movies.archive.find((archivedMovie: Movie) =>
            equalMovie(archivedMovie, movie)
        )
        expect(inArchive).toBeDefined()
        expect(movies.movieList.length).toEqual(lengthList - 1)
        expect(movies.archive.length).toEqual(lengthArchive + 1)
    })
    test("It does nothing when the movie don't exist", () => {
        const lengthList = movies.movieList.length
        const lengthArchive = movies.archive.length
        deleteMovie(movieFake)
        expect(movies.movieList.length).toEqual(lengthList)
        expect(movies.archive.length).toEqual(lengthArchive)
    })
})
