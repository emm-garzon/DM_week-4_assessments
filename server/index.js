const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

// CODE BELOW:

// ADD 3 MORE FEATURES

const {
  getMovies,
  deleteMovie,
  createMovie,
  updateMovie,
} = require("./controller");

app.get("/api/movies", getMovies);
app.delete("/api/movies/:id", deleteMovie);
app.post("/api/movies", createMovie);
app.put("/api/movies/:id", updateMovie);

// ADD NEW FEATURE

app.get("/api/compliment", (req, res) => {
  const compliments = [
    "Gee, you're a smart cookie!",
    "Cool shirt!",
    "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
});

app.get("/api/fortune", (req, res) => {
  const fortune = [
    "A pleasant surprise is waiting for you",
    "All your hard work will soon pay off.",
    "Do not let ambitions overshadow small success.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * fortune.length);
  let randomFortune = fortune[randomIndex];

  res.status(200).send(randomFortune);
});

// CODE ABOVE

app.listen(4000, () => console.log("Server running on 4000"));
