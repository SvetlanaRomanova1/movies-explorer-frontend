import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {saveMovies} from '../../constant'
import Footer from "../Footer/Footer";
import React from "react";

function SavedMovies() {
    return (
        <main>
            <SearchForm/>
            <MoviesCardList isSavedMoviesPage movies={saveMovies} />
            < Footer/>
        </main>
    )
}

export default SavedMovies;
