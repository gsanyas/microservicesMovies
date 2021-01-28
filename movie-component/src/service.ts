import { Movie, MovieAttributes, deleteMovie, createMovie } from "./model"

const addMovies = async (movies: MovieAttributes[]): Promise<Movie[]> => {
    const moviesCreated: Movie[] = []
    for (const movie of movies) {
        const movieCreated = await createMovie(movie)
        moviesCreated.push(movieCreated)
    }
    return moviesCreated
}

const archiveMovies = async (moviesId: number[]): Promise<void> => {
    for (const id of moviesId) {
        await deleteMovie(id)
    }
}

export { addMovies, archiveMovies }
