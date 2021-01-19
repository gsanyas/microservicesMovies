const movieData = require("../data/movies.json").movieList;

exports.addMovies = async (movies) => {
    movieData.push(movies);
    return movieData
};
