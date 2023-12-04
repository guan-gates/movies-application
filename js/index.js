import {
  getMovie,
  postMovie,
  patchMovie,
  deleteMovie,
  dbGetTrendingMovies,
  dbGetMovieTrailerID,
  dbGetMoviesByKeywords,
} from "./api.js";

// !!!I might not need the function as most queries return an arry of movie objects, but just keep it here for now
// query single movie trailer ID
/**
 *
 * @param {obj} movie a single movie object
 * @returns {obj} movie with trailer ID added
 */
const addMovieTrailerIDtoMovie = async (movie) => {
  let trailerKey = (await dbGetMovieTrailerID(movie.movieId)) || "NOT_FOUND";

  if (trailerKey !== "NOT_FOUND") {
    trailerKey = `https://www.youtube.com/watch?v=${trailerKey}`;
  }
  movie.trailerSRC = trailerKey;
  return movie;
};

// query an array of movies' trailer IDs
/**
 * @param {array} movies -- an array of movie objects returned from the fetch request, such as dbGetTrendingMovies
 * @returns {array} -- an array of movie objects with each movie trailer IDs added to the property of the array.
 */

(async () => {
  // let trendingMovies = await dbGetTrendingMovies();
  // console.log(trendingMovies);
  // console.log(trendingMovies[0].imgSRC);
  // const myMovies = await dbGetMoviesByKeywords("doctor");
  // console.log(myMovies);
  //
  // postMovie is fully functional.
})();
