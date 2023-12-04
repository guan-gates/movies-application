import {
  getMovie,
  postMovie,
  patchMovie,
  deleteMovie,
  dbGetTrendingMovies,
  dbGetMovieTrailerID,
} from "./api.js";

// query single movie trailer ID
const addMovieTrailerIDtoMovie = async (movie) => {
  let trailerKey = (await dbGetMovieTrailerID(movie.movieId)) || "NOT_FOUND";

  if (trailerKey !== "NOT_FOUND") {
    trailerKey = `https://www.youtube.com/watch?v=${trailerKey}`;
  }
  movie.trailerSRC = trailerKey;
  return movie;
};

// query an array of movies' trailer IDs
const addMovieTrailerIDtoMovies = async (movies) => {
  movies.forEach(async (movie) => {
    let trailerKey = (await dbGetMovieTrailerID(movie.movieId)) || "NOT_FOUND";

    if (trailerKey !== "NOT_FOUND") {
      trailerKey = `https://www.youtube.com/watch?v=${trailerKey}`;
    }
    movie.trailerSRC = trailerKey;

    // for the convinence, randomly generate ratings for each movie
    movie.rating = Math.floor(Math.random() * 10) + 1;
  });

  return movies;
};

(async () => {
  let trendingMovies = await dbGetTrendingMovies();

  trendingMovies = await addMovieTrailerIDtoMovies(trendingMovies);

  console.log(trendingMovies);
})();
