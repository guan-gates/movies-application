import {
  dbGetMoviesByKeywords,
  dbGetTrendingMovies,
  addMovieTrailerIDtoMovies,
  dbGetMovieTrailerID,
} from "./api.js";

(async () => {
  let trendingMovies = await dbGetTrendingMovies();
  console.log(trendingMovies);
  // console.log(trendingMovies[0].imgSRC);
  // const myMovies = await dbGetMoviesByKeywords("doctor");
  // console.log(myMovies);
  //
  // postMovie is fully functional. It will return.
})();
