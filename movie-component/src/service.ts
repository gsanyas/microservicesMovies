import {
    createMovie,
    findByTitle,
    Movie,
    convertMovieAttributes,
    MovieAttributes,
    findById,
    deleteMovie,
} from "./model"
import { isArrayOfStrings } from "./utils"

const addMovie = createMovie

const addMovies = async (movies: MovieAttributes[]): Promise<Movie[]> => {
    const moviesCreated: Movie[] = []
    for (const movie of movies) {
        const movieCreated = await addMovie(movie)
        moviesCreated.push(movieCreated)
    }
    return moviesCreated
}

const archiveMovie = (movieId: number): boolean => {
    const movie: Movie = findById(movieId)
    if (movie) {
        deleteMovie(movie)
        return true
    } else {
        return false
    }
}

const archiveMovies = async (moviesId: number[]): Promise<void> => {
    for (const id of moviesId) {
        await archiveMovie(id)
    }
}

const findMovie = findByTitle

const toMovieAttributes = convertMovieAttributes

const getMovie = findById

export {
    addMovie,
    archiveMovie,
    addMovies,
    archiveMovies,
    findMovie,
    getMovie,
    toMovieAttributes,
}
