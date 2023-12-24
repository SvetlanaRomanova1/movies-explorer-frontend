import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';

function SavedMovies(props) {
  const {
    updateMovies,
    removeMoviesById,
    saveIds,
    setSaveIds,
    savedMovies,
    onDeleteMovie,
  } = props;

  const [filteredMovies, setFilteredMovies] = useState([]);
  const update = updateMovies(setFilteredMovies);

  return (
    <>
      <SearchForm
        savedMovies={savedMovies}
        updateMovies={update}
        isSavedMoviesPage
      />
      <MoviesCardList
        isSavedMoviesPage
        removeMoviesById={removeMoviesById}
        movies={filteredMovies.filter((movie) => [...saveIds.keys()].includes(movie.id))}
        saveIds={saveIds}
        setSaveIds={setSaveIds}
        onDeleteMovie={onDeleteMovie}
      />
    </>
  );
}

export default SavedMovies;
