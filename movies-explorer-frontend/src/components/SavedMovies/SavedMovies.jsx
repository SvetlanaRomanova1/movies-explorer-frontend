import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {saveMovies} from '../../constant'

function SavedMovies() {
    return (
        <main>
            <SearchForm/>
            <MoviesCardList isSavedMoviesPage movies={saveMovies}/>
        </main>
    )
}

export default SavedMovies;
