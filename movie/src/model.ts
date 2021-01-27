import movies from "./data/movies.json"

let movieList: Movie[] = movies.movieList

interface MovieAttributes {
    title: string
    director: string
    genre: string
}

interface Movie extends MovieAttributes {
    id: number
}

function hasMovieAttributes(object: object): boolean {
    if ("title" in object && "director" in object && "genre" in object) {
        const movie = object as MovieAttributes
        return (
            typeof movie.title === "string" &&
            typeof movie.director === "string" &&
            typeof movie.genre === "string"
        )
    } else {
        return false
    }
}

function isMovie(object: object): boolean {
    if (hasMovieAttributes(object) && "id" in object) {
        const movie = object as Movie
        return typeof movie.id === "number"
    } else {
        return false
    }
}

function equalAttributes(m1: MovieAttributes, m2: MovieAttributes): boolean {
    return (
        hasMovieAttributes(m1) &&
        hasMovieAttributes(m2) &&
        m1.title === m2.title &&
        m1.director === m2.director &&
        m1.genre === m2.genre
    )
}

function createMovie(movieAttributes: MovieAttributes): Movie {
    if (movieList.some((m: Movie) => equalAttributes(movieAttributes, m))) {
        return undefined
    }
    const movie: Movie = movieAttributes as Movie
    movie.id = movies.current_id
    movies.current_id = movie.id + 1
    movieList.push(movie)
    return movie
}

function findByTitle(title: string): Movie {
    return movieList.find((m: Movie) => m.title === title)
}

function convertMovieAttributes(movie: object): MovieAttributes {
    if (hasMovieAttributes(movie)) {
        return movie as MovieAttributes
    } else {
        return undefined
    }
}

function findById(id: number): Movie {
    return movieList.find((m: Movie) => m.id === id)
}

function deleteMovie(movie: Movie): void {
    movies.movieList = movieList.filter((m: Movie) => m.id !== movie.id)
    movieList = movies.movieList
    movies.archive.push(movie)
}

export {
    Movie,
    MovieAttributes,
    isMovie,
    convertMovieAttributes,
    createMovie,
    deleteMovie,
    findById,
    findByTitle,
}
