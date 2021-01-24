import data from "./data/movies.json"
import { Movie } from "./model"

const movieData = data.movieList

const addMovies = async (movies: Movie) => {
    movieData.push(movies)
    return movieData
}

export { addMovies }
