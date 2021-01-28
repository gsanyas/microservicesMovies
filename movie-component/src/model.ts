import movies from "./data/movies.json"

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
    console.log(JSON.stringify(object))
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

function equalMovie(m1: Movie, m2: Movie): boolean {
    return (
        equalAttributes(m1, m2) && isMovie(m1) && isMovie(m2) && m1.id === m2.id
    )
}

function createMovie(movieAttributes: MovieAttributes): Movie {
    if (
        movies.movieList.some((m: Movie) => equalAttributes(movieAttributes, m))
    ) {
        return undefined
    }
    const movie: Movie = movieAttributes as Movie
    movie.id = movies.current_id
    movies.current_id = movie.id + 1
    movies.movieList.push(movie)
    return movie
}

function findByTitle(title: string): Movie {
    return movies.movieList.find((m: Movie) => m.title === title)
}

function toMovieAttributes(movie: object): MovieAttributes {
    if (hasMovieAttributes(movie)) {
        return movie as MovieAttributes
    } else {
        return undefined
    }
}

function findById(id: number): Movie {
    return movies.movieList.find((m: Movie) => m.id === id)
}

function deleteMovie(movieId: number): boolean {
    const movie: Movie = findById(movieId)
    if (movie) {
        movies.movieList = movies.movieList.filter(
            (m: Movie) => m.id !== movie.id
        )
        movies.movieList = movies.movieList
        movies.archive.push(movie)
        return true
    } else {
        return false
    }
}

export {
    Movie,
    MovieAttributes,
    isMovie,
    toMovieAttributes,
    createMovie,
    deleteMovie,
    equalMovie,
    findById,
    findByTitle,
    hasMovieAttributes,
}
