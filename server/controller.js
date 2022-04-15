let movies = require("./db.json");
let globalID = 4;

module.exports = {
  getMovies: (req, res) => {
    res.status(200).send(movies);
  },
  deleteMovie: (req, res) => {
    let index = movies.findIndex((elem) => elem.id === +req.params.id);
    movies.splice(index, 1);
    res.status(200).send(movies);
  },
  createMovie: (req, res) => {
    const { title, rating } = req.body;
    let newMovie = {
      id: globalID,
      title,
      rating: +rating,
    };
    movies.push(newMovie);
    globalID++;
    res.status(200).send(movies);
  },
  updateMovie: (req, res) => {
    const { id } = req.params;
    const { type } = req.body;
    let index = movies.findIndex((elem) => +elem.id === +id);
    if (movies[index].rating > 0 && type === "minus") {
      movies[index].rating -= 1;
      res.status(200).send(movies);
    } else if (movies[index].rating < 10 && type === "plus") {
      movies[index].rating += 1;
      res.status(200).send(movies);
    } else {
      res.sendStatus(400).send("Error, contact site admin.");
    }
  },
};
