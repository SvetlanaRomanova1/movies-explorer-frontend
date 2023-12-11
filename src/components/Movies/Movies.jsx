import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {movies} from "../../constant";

function Movies() {
    return (
            <div className="main">
                <SearchForm/>
                <MoviesCardList movies={movies}/>
            </div>
    );
}

export default Movies;
