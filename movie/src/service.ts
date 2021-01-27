import {
    createMovie,
    findByTitle,
    Movie,
    convertMovieAttributes,
    MovieAttributes,
} from "./model"
import { isArrayOfStrings } from "./utils"
import { plainToClass } from "class-transformer"

const addMovie = createMovie

const addMovies = async (movies: MovieAttributes[]): Promise<Movie[]> => {
    const moviesCreated: Movie[] = []
    for (const movie of movies) {
        const movieCreated = await addMovie(movie)
        moviesCreated.push(movieCreated)
    }
    return moviesCreated
}

const archiveMovie = (movieId: number): void => {
    console.log("to implement")
}

const archiveMovies = async (moviesId: number[]): Promise<void> => {
    for (const id of moviesId) {
        await archiveMovie(id)
    }
}

const findMovie = findByTitle

const toMovieAttributes = convertMovieAttributes

export {
    addMovie,
    archiveMovie,
    addMovies,
    archiveMovies,
    findMovie,
    toMovieAttributes,
}
