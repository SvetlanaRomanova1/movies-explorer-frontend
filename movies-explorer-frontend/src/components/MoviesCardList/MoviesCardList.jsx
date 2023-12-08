import React, {useEffect, useState} from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import Delimiter from "../Delimiter/Delimiter";
import Footer from "../Footer/Footer";

function MoviesCardList({movies, isSavedMoviesPage}) {

    const [visibleMovies, setVisibleMovies] = useState(8);
    const totalMovies = 12;
    const isShowMoreButton = movies.length !== visibleMovies;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1000) {
                setVisibleMovies(12);
            } else {
                setVisibleMovies(8);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const showMoreMovies = () => {
        // При нажатии кнопки "Показать еще", увеличиваем количество видимых фильмов
        setVisibleMovies(prevVisibleMovies =>
            prevVisibleMovies + (prevVisibleMovies === 8 ? 4 : totalMovies - prevVisibleMovies)
        );
    };

    return (
        <section className="movies__card">
            <Delimiter/>
            <div className="movies-card__list">
                {movies.slice(0, visibleMovies).map((movie) => (
                    <MoviesCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        duration={movie.duration}
                        image={movie.image}
                        isSavedMoviesPage={isSavedMoviesPage}
                    />
                ))}
            </div>
            {isShowMoreButton
            && (<div className="movies-card__wrapper_button">
                <button className="movies-card__button" onClick={showMoreMovies}>Ещё</button>
            </div>)}
        </section>
    );
}

export default MoviesCardList;

