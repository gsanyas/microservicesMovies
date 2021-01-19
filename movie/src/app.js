const { addMovies } = require("./movieService");
const { checkRights } = require("./filter");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors({ origin: config.origin }));
app.use(express.json());

app.post("/add", checkRights, (req, res) => {
    if (req.body.movies) {
        const data = addMovies(req.body.movies);
        res.status(200).json(data);
    }
});

module.exports = app;
