import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {saveMovies} from '../../constant'

function SavedMovies() {
    return (
        <>
            <SearchForm/>
            <MoviesCardList isSavedMoviesPage movies={saveMovies} />
        </>
    )
}

export default SavedMovies;
