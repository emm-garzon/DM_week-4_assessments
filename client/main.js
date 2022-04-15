document.getElementById("complimentButton").onclick = function () {
  axios.get("http://localhost:4000/api/compliment/").then(function (response) {
    const data = response.data;
    alert(data);
  });
};

// ADD NEW FEATURE

document.getElementById("fortuneBtn").onclick = function () {
  axios.get("http://localhost:4000/api/fortune/").then(function (response) {
    const data = response.data;
    alert(data);
  });
};

// ADD 3 MORE FEATURES

const moviesContainer = document.querySelector("#movies-container");
const form = document.querySelector("form");

const baseURL = `http://localhost:4000/api/movies`;

const moviesCallback = ({ data: movies }) => displayMovies(movies);
const errCallback = (err) => {
  console.log(err);
};

const getAllMovies = () => {
  axios.get(baseURL).then(moviesCallback).catch(errCallback);
};

const createMovie = (body) => {
  axios.post(baseURL, body).then(moviesCallback).catch(errCallback);
};

const deleteMovie = (id) => {
  axios.delete(`${baseURL}/${id}`).then(moviesCallback).catch(errCallback);
};

const updateMovie = (id, type) => {
  axios
    .put(`${baseURL}/${id}`, { type })
    .then(moviesCallback)
    .catch(errCallback);
};

const submitHandler = (event) => {
  event.preventDefault();

  let title = document.querySelector("#title");
  let rating = document.querySelector("#rating");

  let newObj = {
    title: title.value,
    rating: +rating.value,
  };

  createMovie(newObj);

  title.value = "";
  rating.value = "";
};

const createMovieCard = (movie) => {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  movieCard.innerHTML = `
  <p>${movie.title}</p>
  <div class="btn-container">
    <button onclick="updateMovie(${movie.id}, 'minus')">-</button>
    <p class="movie-rating">${movie.rating} stars</p>
    <button onclick="updateMovie(${movie.id}, 'plus')">+</button>
  </div>
  <button onclick="deleteMovie(${movie.id})">delete</button>`;

  moviesContainer.appendChild(movieCard);
};

const displayMovies = (arr) => {
  moviesContainer.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    createMovieCard(arr[i]);
  }
};

form.addEventListener("submit", submitHandler);

getAllMovies();
