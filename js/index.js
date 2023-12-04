import {
  dbGetMoviesByKeywords,
  dbGetTrendingMovies,
  addTrailerIDandReviewtoMovies,
  dbGetMovieTrailerID,
  postMovie,
} from "./api.js";

const renderCard = (movie) => {
  const newElement = document.createElement("div");
  newElement.classList.add("movie-card");
  newElement.setAttribute("movieid", movie.movieid);
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
      <i class="bi bi-play-fill play-movie-card"></i>
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
          style="width: 90%"
          id="rating-bar"
          value="10"
        >
          10/10
        </div>
      </div>
    </div>
  </div>

  
  
  `;
};

const handlePlayTrailer = (e) => {
  const trailerSRC = e.target.getAttribute("trailersrc");
  let trailerPlayer = document.querySelector(`iframe`);
  trailerPlayer.src = trailerSRC;
  trailerPlayer.classList.toggle("d-none");
};

(async () => {
  //!!!Do not delete!!! The following codes are successful.
  // let movies = await dbGetMoviesByKeywords("wonka");
  // movies.forEach(async (movie) => {
  //   await postMovie(movie);
  // });
  const playBTN = document.querySelector(".play-movie-card");
  playBTN.addEventListener("click", (e) => {
    handlePlayTrailer(e);
  });

  // window.addEventListener("click", closePlayer);
})();
