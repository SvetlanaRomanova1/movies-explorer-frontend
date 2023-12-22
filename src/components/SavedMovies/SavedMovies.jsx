import React from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';

function SavedMovies(props) {
  const {
    updateMovies,
    removeMoviesById,
    filteredMovies,
    saveIds,
    setSaveIds,
    savedMovies,
  } = props;

  return (
    <>
      <SearchForm savedMovies={savedMovies} updateMovies={updateMovies}/>
      <MoviesCardList
        isSavedMoviesPage
        removeMoviesById={removeMoviesById}
        movies={filteredMovies.filter((movie) => [...saveIds.keys()].includes(movie.id))}
        saveIds={saveIds}
        setSaveIds={setSaveIds}
      />
    </>
  );
}

export default SavedMovies;
