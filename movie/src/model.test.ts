import {
    toMovieAttributes,
    createMovie,
    deleteMovie,
    equalMovie,
    findById,
    findByTitle,
    hasMovieAttributes,
    isMovie,
    Movie,
    MovieAttributes,
} from "./model"
import movies from "./data/movies.json"
import { copyObject } from "./utils"

const defaultMovieList: Movie[] = copyObject(movies.movieList)
const defaultId: number = movies.current_id
const defaultArchive: Movie[] = copyObject(movies.archive)

let movieAttributes: MovieAttributes = {
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

const movieFake2: Movie = {
    title: "fakeTitle",
    director: "fakeDirector",
    genre: "fakeGenre",
    id: -2,
}

const movieFake3: Movie = {
    title: "fakeTitle2",
    director: "fakeDirector",
    genre: "fakeGenre",
    id: -1,
}

const movieFake4: Movie = {
    title: "fakeTitle",
    director: "fakeDirector2",
    genre: "fakeGenre",
    id: -1,
}

const movieFake5: Movie = {
    title: "fakeTitle",
    director: "fakeDirector",
    genre: "fakeGenre2",
    id: -1,
}

const resetData = () => {
    movies.movieList = copyObject(defaultMovieList)
    movies.current_id = defaultId
    movies.archive = copyObject(defaultArchive)
}

const resetMovieAttributes = () => {
    movieAttributes = {
        title: "TestTitle",
        director: "TestDirector",
        genre: "TestGenre",
    }
}

const fullReset = () => {
    resetData()
    resetMovieAttributes()
}

describe("CreateMovie", () => {
    beforeEach(fullReset)
    afterEach(fullReset)
    test("It creates a movie", () => {
        const length = movies.movieList.length
        const result = createMovie(movieAttributes)
        expect(result).toBeDefined()
        expect(result.title).toEqual(movieAttributes.title)
        expect(result.director).toEqual(movieAttributes.director)
        expect(result.genre).toEqual(movieAttributes.genre)
        expect(result.id).toBeDefined()
        expect(movies.movieList.length).toBe(length + 1)
    })
    test("It returns undefined", () => {
        createMovie(movieAttributes)
        const length = movies.movieList.length
        const result = createMovie(movieAttributes)
        expect(result).toBeUndefined()
        expect(length).toBe(movies.movieList.length)
    })
})

describe("findByTitle", () => {
    beforeEach(fullReset)
    afterEach(fullReset)
    test("It returns undefined when a movie does not exists", () => {
        const result = findByTitle(movieAttributes.title)
        expect(result).toBeUndefined()
    })
    test("It returns a movie when it exists", () => {
        createMovie(movieAttributes)
        const result = findByTitle(movieAttributes.title)
        expect(result).toBeDefined()
        expect(result.title).toBe(movieAttributes.title)
    })
})

describe("equalMovie", () => {
    beforeEach(resetMovieAttributes)
    afterEach(resetMovieAttributes)
    test("It returns true when movies are the same", () => {
        const result = equalMovie(movieFake, movieFake)
        expect(result).toBe(true)
    })
    test("It returns false when movies are different", () => {
        const result1 = equalMovie(movieFake, movieFake2)
        expect(result1).toBe(false)
        const result2 = equalMovie(movieFake, movieFake3)
        expect(result2).toBe(false)
        const result3 = equalMovie(movieFake, movieFake4)
        expect(result3).toBe(false)
        const result4 = equalMovie(movieFake, movieFake5)
        expect(result4).toBe(false)
    })
})

describe("findById", () => {
    beforeEach(fullReset)
    afterEach(fullReset)
    test("It finds a movie", () => {
        const movie = createMovie(movieAttributes)
        const result = findById(movie.id)
        expect(movie).toEqual(result)
    })
    test("It returns undefined when there is no movie", () => {
        const result = findById(movieFake.id)
        expect(result).toBeUndefined()
    })
})

describe("deleteMovie", () => {
    beforeEach(fullReset)
    afterEach(fullReset)
    test("It deletes a movie that exists", () => {
        const movie = createMovie(movieAttributes)
        const lengthList = movies.movieList.length
        const lengthArchive = movies.archive.length
        deleteMovie(movie.id)
        const inMovieList = findById(movie.id)
        expect(inMovieList).toBeUndefined()
        const inArchive = movies.archive.find((archivedMovie: Movie) =>
            equalMovie(archivedMovie, movie)
        )
        expect(inArchive).toBeDefined()
        expect(movies.movieList.length).toBe(lengthList - 1)
        expect(movies.archive.length).toBe(lengthArchive + 1)
    })
    test("It does nothing when the movie don't exist", () => {
        const lengthList = movies.movieList.length
        const lengthArchive = movies.archive.length
        deleteMovie(movieFake.id)
        expect(movies.movieList.length).toBe(lengthList)
        expect(movies.archive.length).toBe(lengthArchive)
    })
})

describe("isMovie", () => {
    beforeAll(resetMovieAttributes)
    test("It returns true if it is a movie", () => {
        const result = isMovie(movieFake)
        expect(result).toBe(true)
    })
    test("It returns false if it is not a movie", () => {
        const result = isMovie(movieAttributes)
        expect(result).toBe(false)
    })
})

describe("hasMovieAttributes", () => {
    beforeAll(resetMovieAttributes)
    test("It returns true if it is a movieAttributes", () => {
        const result = hasMovieAttributes(movieAttributes)
        expect(result).toBe(true)
    })
    test("It returns false if it has not movieAttributes", () => {
        const result1 = hasMovieAttributes({
            title: "fakeAttributesTitle",
            director: "fakeAttributesDirector",
        })
        expect(result1).toBe(false)
        const result2 = hasMovieAttributes({
            genre: "fakeAttributesGenre",
            director: "fakeAttributesDirector",
        })
        expect(result2).toBe(false)
        const result3 = hasMovieAttributes({
            title: "fakeAttributesTitle",
            genre: "fakeAttributesGenre",
        })
        expect(result3).toBe(false)
    })
})

describe("toMovieAttributes", () => {
    test("It returns a movie attributes if the correct attributes are given", () => {
        const result = toMovieAttributes({
            title: "convertTitle",
            director: "convertDirector",
            genre: "convertGenre",
        })
        expect(hasMovieAttributes(result)).toBe(true)
    })
    test("It returns undefined if the attributes are incorrect", () => {
        const result1 = toMovieAttributes({
            title: "fakeAttributesTitle",
            director: "fakeAttributesDirector",
        })
        expect(result1).toBeUndefined()
        const result2 = toMovieAttributes({
            genre: "fakeAttributesGenre",
            director: "fakeAttributesDirector",
        })
        expect(result2).toBeUndefined()
        const result3 = toMovieAttributes({
            title: "fakeAttributesTitle",
            genre: "fakeAttributesGenre",
        })
        expect(result3).toBeUndefined()
    })
})
