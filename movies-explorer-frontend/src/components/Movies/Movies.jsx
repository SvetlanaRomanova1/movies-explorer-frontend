import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {movies} from "../../constant";
import Footer from "../Footer/Footer";

function Movies() {
    return (
        <div className="main">
            <SearchForm />
            <MoviesCardList movies={movies} />
            < Footer/>
        </div>
    );
}

export default Movies;
