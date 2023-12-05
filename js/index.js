import {
  getMovie,
  dbGetMoviesByKeywords,
  dbGetTrendingMovies,
  addTrailerIDandReviewtoMovies,
  dbGetMovieTrailerID,
  postMovie,
  postMovieLocal,
  patchMovie,
  deleteMovie,
  getAllMovies,
} from "./api.js";

const updateRating = async (progress, movie) => {
  await patchMovie(movie);
  progress.innerHTML = ``;
  progress.innerHTML = `
  <div class="progress-bar bg-success" style="width: ${movie.rating}0%" id="rating-bar"
  value="${movie.rating}">${movie.rating}/10 </div>
  `;
};

const deleteMovieCard = async (id, childNode, parentNode) => {
  deleteMovie(id);
  parentNode.removeChild(childNode);
};

const handlePlayTrailer = (e) => {
  const trailerSRC = e.target.getAttribute("trailersrc");
  let playerContainer = document.querySelector("#player-container");

  playerContainer.innerHTML = `
    <div class="trailer-player-bg"></div>
    <iframe class="trailer-player" src="${trailerSRC}"></iframe>
  `;
  const closeBtn = playerContainer.querySelector(".trailer-player-bg");
  closeBtn.addEventListener("click", () => {
    playerContainer.innerHTML = "";
  });
};

const createMovieForm = () => {
  const form = document.querySelector("#create-movie");
  const movieTitle = form.querySelector("#movietitle").value;
  const movieYear = form.querySelector("#movieyear").value;
  const movieGenres = form.querySelectorAll(" input:checked");
  let genres = [];
  movieGenres.forEach((movieGenre) => {
    genres.push(movieGenre.value);
  });

  const rating = document.querySelector("#movierating").value;
  const newMovie = {
    title: movieTitle,
    movieIndex: Math.floor(Math.random() * 1000000),
    imgSRC: "./img/movie-demo.png",
    year: movieYear,
    genre: genres,
    rating: rating,
  };
  return newMovie;
};

const renderCard = (movie) => {
  const parentNode = document.querySelector("#movie-cards");
  const newElement = document.createElement("div");
  if (movie.title.length > 15) {
    movie.title = movie.title.slice(0, 12) + "...";
  }
  newElement.classList.add("movie-card");
  newElement.setAttribute("movieIndex", `${movie.movieIndex}`);
  newElement.innerHTML = `
    <img
      src="${movie.imgSRC}"
      class="d-block"
      alt="First slide"
    />
    <div
      class="movie-info d-flex justify-content-between px-1 my-2"
    >
      <div id="movie-title" class="me-5">
        ${movie.title}
      </div>
      <div id="movie-year" class="flex-grow-1">${movie.year}</div>
      <button class="play me-2">
        <i class="bi bi-play-fill play-movie-card"
        trailersrc="${movie.trailerSRC}"></i>
      </button>
      <i class="bi bi-trash3-fill small delete-movie"></i>
    </div>
    <!--     ANCHOR LINK TO NEXT PAGE FOR MOVIE PLAY-->
    <div class="movie-play d-flex movie-info">
      <div
        id="rating"
        class="col-12 d-flex justify-content-between gap-3 align-items-center"
      >
        Rating: <i class="bi bi-dash-lg"></i>
        <div
          class="progress flex-grow-1"
          role="progressbar"
          aria-label="Success example"
          aria-valuenow="90"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            class="progress-bar bg-success"
            style="width: ${movie.rating}0%"
            id="rating-bar"
            value="${movie.rating}"
          >
          ${movie.rating}/10
          </div>
          
        </div><i class="bi bi-plus-lg"></i>
      </div>
    </div>
  `;

  const playBTN = newElement.querySelector(".play-movie-card");

  // add event listener to the play button
  playBTN.addEventListener("click", (e) => {
    handlePlayTrailer(e);
  });

  const plus = newElement.querySelector(".bi-plus-lg");
  const minue = newElement.querySelector(".bi-dash-lg");

  // add event listener to the plus icon
  plus.addEventListener("click", async () => {
    movie.rating += 1;
    const progress = newElement.querySelector(".progress");
    updateRating(progress, movie);
  });
  // add event listener to the minus icon
  minue.addEventListener("click", async () => {
    movie.rating -= 1;
    const progress = newElement.querySelector(".progress");
    updateRating(progress, movie);
  });

  const deletebtn = newElement.querySelector(".delete-movie");
  deletebtn.addEventListener("click", async () => {
    await deleteMovieCard(movie.id, newElement, parentNode);
  });

  parentNode.appendChild(newElement);
};

// render movie those movies cards for user to pick from
const renderTemperaryCard = (movie) => {
  const parentNode = document.querySelector("#display-search-results");

  const newElement = document.createElement("div");
  if (movie.title.length > 15) {
    movie.title = movie.title.slice(0, 12) + "...";
  }
  newElement.classList.add("gallery-item");
  newElement.innerHTML = `
  <img src="${movie.imgSRC}" />
  <div class="d-flex justify-content-between px-1 mt-2">
    <p>${movie.title}</p>
    <p>${movie.year}</p>
    <div class="d-flex gap-1 align-items-center">
      <i class="bi bi-play-fill play-movie-card"
trailersrc="${movie.trailerSRC}"></i>
<i class="bi bi-heart-fill small"></i>
    </div>
  </div>
  `;

  const playBTN = newElement.querySelector(".play-movie-card");
  // add event listener to the play button
  playBTN.addEventListener("click", (e) => {
    handlePlayTrailer(e);
  });

  const likeMovie = newElement.querySelector(".bi-heart-fill");
  // once liked, make the button red and add the movie to the json-server
  likeMovie.addEventListener("click", async () => {
    likeMovie.classList.add("likemovie");
    await postMovie(movie);
  });

  parentNode.appendChild(newElement);
};

const displayLikeMovies = async () => {
  let movies = await getAllMovies();
  movies.forEach((movie) => {
    renderCard(movie);
  });
};

// handle submit button event to show the search results

(async () => {
  // !!!Do not delete!!! The following codes are successful.
  // let movies = await dbGetMoviesByKeywords("avengers");
  // movies.forEach(async (movie) => {
  //   await postMovie(movie);
  // });

  //loading page
  window.addEventListener("load", (e) => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader-hidden");
    loader.addEventListener("transitionend", (e) => {
      document.body.removeChild("loader");
    });
  });

  // search for movies
  const searchMovies = document.querySelector("#search-movies");
  searchMovies.addEventListener("submit", async (e) => {
    e.preventDefault();
    const keywords = searchMovies.querySelector("input").value;
    let results = await dbGetMoviesByKeywords(keywords);
    console.log(results);
    results.forEach((movie) => {
      renderTemperaryCard(movie);
    });
  });

  //display all the liked movies
  await displayLikeMovies();

  //pop up the create new movie form
  const newMovieForm = document.querySelector("#form-create-movie");

  document.querySelector("#show-create-form").addEventListener("click", () => {
    newMovieForm.classList.add("moving-left-add");
  });

  // create a new movie
  const createMovieSubmitButton = document.querySelector(".btn-add-movie");
  createMovieSubmitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const newMovie = createMovieForm();
    await postMovieLocal(newMovie);
  });

  //close the add movie modal
  document.querySelector(".close-new-btn").addEventListener("click", () => {
    newMovieForm.classList.remove("moving-left-add");
  });
})();
