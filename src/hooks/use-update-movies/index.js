import { useState } from 'react';
import { DURATION } from '../../constant';

function compareFilm(name1, name2) {
  return name1.toLowerCase().includes(name2.toLowerCase());
}

function useUpdateMovies() {
  const [savedMovies, setSavedMovies] = useState([]);
  const updateMovies = (setFilteredMovies) => (params) => {
    const {
      search = '',
      isShortFilm = false,
    } = params;

    setFilteredMovies(savedMovies.filter((item) => {
      const isShort = isShortFilm ? item.duration <= DURATION : true;
      const includesNameRU = compareFilm(item.nameRU, search);
      const includesNameEN = compareFilm(item.nameEN, search);
      return (includesNameRU || includesNameEN) && isShort;
    }));
  };

  function removeMoviesById(id) {
    setSavedMovies((prevState) => prevState.filter((item) => item._id !== id));
  }

  return {
    updateMovies,
    setSavedMovies,
    removeMoviesById,
    savedMovies,
  };
}

export default useUpdateMovies;
