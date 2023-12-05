import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import Delimiter from "../Delimiter/Delimiter";

function MoviesCardList({ movies }) {

    return (
        <section className="movies__card">
            <Delimiter />
            <div className="movies-card__list">
                {movies.map((movie) => (
                    <MoviesCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        duration={movie.duration}
                        image={movie.image}
                    />
                ))}
            </div>
            <div className="movies-card__wrapper_button">
                <button className="movies-card__button">Ещё</button>
            </div>
        </section>
    );
}

export default MoviesCardList;

