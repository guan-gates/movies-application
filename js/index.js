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
})();



/// just add something to the working tree

add something to the working tree!. Delete this !!!!