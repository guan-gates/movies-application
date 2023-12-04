import {
  getMovie,
  dbGetMoviesByKeywords,
  dbGetTrendingMovies,
  addTrailerIDandReviewtoMovies,
  dbGetMovieTrailerID,
  postMovie,
} from "./api.js";

const renderCard = (movie) => {
  const parentNode = document.querySelector("#movie-cards");
  const newElement = document.createElement("div");
  newElement.classList.add("movie-card");
  newElement.setAttribute("movieid", `${movie.movieId}`);
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
        Rating:
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
        </div>
      </div>
    </div>
  `;

  const playBTN = newElement.querySelector(".play-movie-card");
  console.log(playBTN);
  playBTN.addEventListener("click", (e) => {
    console.log(playBTN);
    handlePlayTrailer(e);
  });

  parentNode.appendChild(newElement);
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

(async () => {
  // !!!Do not delete!!! The following codes are successful.
  // let movies = await dbGetMoviesByKeywords("avengers");
  // movies.forEach(async (movie) => {
  //   await postMovie(movie);
  // });

  const movie8 = await getMovie("3");
  const movie1 = await getMovie("4");
  [movie8, movie1].forEach((movie) => {
    renderCard(movie);
  });
})();
