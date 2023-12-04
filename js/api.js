import { keys } from "./keys.js";

export const getMovies = async (searchInput) => {
  // if search by movie title

  let url1 = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`;

  let url2 = `https://api.themoviedb.org/3/trending/all/day?language=en-US`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export const getMovie = async (id) => {
  const url = `http://localhost:3000/movies/${id}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export const deleteMovie = async (id) => {
  const url = `http://localhost:3000/movies/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export const postMovie = async (movie) => {
  const body = JSON.stringify(movie);

  const url = `http://localhost:3000/movies`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export const patchMovie = async (movie) => {
  const newMovie = {
    ...movie,
  };
  const body = JSON.stringify(newMovie);

  const url = `http://localhost:3000/movies/${movie.id}`;
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

// fetch movie trailer ID
export const dbGetMovieTrailerID = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${keys.accessToken}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const results = data.results;
    const key = results[results.length - 1].key;

    return key;

    return key;
  } catch (err) {
    console.log(err);
  }

  // let trailerKey = await data.videos.results[result.length() - 1].key;
  // // const src =
  // return trailerKey;
};
export const addMovieTrailerIDtoMovies = async (movies) => {
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
// fetch trending movies
export const dbGetTrendingMovies = async () => {
  const url = `https://api.themoviedb.org/3/trending/all/day?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${keys.accessToken}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const movies = data.results;

    let trendingMovies = [];
    for (let movie of movies) {
      let trendingMovie = {};
      trendingMovie.title = movie.title || movie.name;
      trendingMovie.movieId = movie.id;
      trendingMovie.imgSRC = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      trendingMovie.year = movie.release_date || movie.first_air_date;
      trendingMovie.year = trendingMovie.year.slice(0, 4);
      trendingMovie.genre = dbConvertMovieGenre(movie.genre_ids);
      trendingMovies.push(trendingMovie);
    }

    return await addMovieTrailerIDtoMovies(trendingMovies);
  } catch (err) {
    console.log(err);
  }
};

// convert movie genre ID to movie genre name
const dbConvertMovieGenre = (genreIDs) => {
  const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10759: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const newGenres = genreIDs.map((id) => genres[id]);

  return newGenres;
};

// search for movies by keywords
export const dbGetMoviesByKeywords = async (keywords) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${keywords}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${keys.accessToken}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const movies = data.results;

    let keywordsMovies = [];
    for (let movie of movies) {
      let keywordsMovie = {};
      keywordsMovie.title = movie.title || movie.name;
      keywordsMovie.movieId = movie.id;
      keywordsMovie.imgSRC = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      keywordsMovie.year = movie.release_date || movie.first_air_date;
      keywordsMovie.year = keywordsMovie.year.slice(0, 4);
      keywordsMovie.genre = dbConvertMovieGenre(movie.genre_ids);
      keywordsMovies.push(keywordsMovie);
    }

    let keywordsMoviesWithTrailID = await addMovieTrailerIDtoMovies(
      keywordsMovies
    );
    return keywordsMoviesWithTrailID;
  } catch (err) {
    console.log(err);
  }
};
