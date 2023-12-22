import React from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';

function Movies(props) {
  const {
    updateMovies,
    isLoading,
    removeMoviesById,
    filteredMovies,
    saveIds,
    setSaveIds,
    savedMovies,
  } = props;

  return (
    <div className="main">
      <SearchForm
        updateMovies={updateMovies}
        savedMovies={savedMovies}
      />
      <MoviesCardList
        removeMoviesById={removeMoviesById}
        isLoading={isLoading}
        movies={filteredMovies}
        saveIds={saveIds}
        setSaveIds={setSaveIds}
      />
    </div>
  );
}

export default Movies;
