import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';

function Movies(props) {
  const {
    updateMovies,
    isLoading,
    saveIds,
    savedMovies,
    onSaveMovie,
    onDeleteMovie,
  } = props;

  const [filteredMovies, setFilteredMovies] = useState([]);
  const update = updateMovies(setFilteredMovies);

  return (
    <div className="main">
      <SearchForm
        updateMovies={update}
        savedMovies={savedMovies}
      />
      <MoviesCardList
        isLoading={isLoading}
        movies={filteredMovies}
        saveIds={saveIds}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
      />
    </div>
  );
}

export default Movies;
