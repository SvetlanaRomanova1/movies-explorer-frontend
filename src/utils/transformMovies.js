import moviesApi from './MoviesApi';

function transformMovies(movies) {
  return movies.reduce((acc, movie) => {
    acc.push({
      id: movie.id,
      duration: movie.duration,
      url: `${moviesApi.baseUrl + String(movie.image?.url)}`,
      country: movie.country,
      director: movie.director,
      year: movie.year,
      description: movie.description,
      trailerLink: movie.trailerLink,
      thumbnail: `${moviesApi.baseUrl + String(movie.image?.formats?.thumbnail?.url)}`,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    });
    return acc;
  }, []);
}

export default transformMovies;
