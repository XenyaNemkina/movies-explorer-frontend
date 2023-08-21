import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import useWindowDimensions from "../../utils/changeWindow";
import { SMALL_WINDOW_WIDTH, MEDIUM_WINDOW_WIDTH, SMALL_ROW_NUMBER, MEDIUM_ROW_NUMBER, LARGE_ROW_NUMBER, SMALL_ADD_MOVIE_ROW, MEDIUM_ADD_MOVIE_ROW, LARGE_ADD_MOVIE_ROW } from "../../utils/constants";

function MoviesCardList({ savedMovies, isSaved, saveMovie, deleteMovie, movies }) {
  const [rowNumber, setRowNumber] = useState(0);
  const [limitCoin, setLimitCoin] = useState(0)

  let windowWidth = useWindowDimensions().width

  const cardsCount = () => {
    if (windowWidth < SMALL_WINDOW_WIDTH) {
      setRowNumber(SMALL_ROW_NUMBER);
    } else if (windowWidth >= SMALL_WINDOW_WIDTH && windowWidth < MEDIUM_WINDOW_WIDTH) {
      setRowNumber(MEDIUM_ROW_NUMBER);
    } else {
      setRowNumber(LARGE_ROW_NUMBER);
    }
  }

  function showMoreCards() {
    if (windowWidth < SMALL_WINDOW_WIDTH) {
      setRowNumber(rowNumber + SMALL_ADD_MOVIE_ROW);
    } else if (windowWidth >= SMALL_WINDOW_WIDTH && windowWidth < MEDIUM_WINDOW_WIDTH) {
      setRowNumber(rowNumber + MEDIUM_ADD_MOVIE_ROW);
    } else {
      setRowNumber(rowNumber + LARGE_ADD_MOVIE_ROW);
    }
  }

  useEffect(() => {
    cardsCount();
  }, [])


  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', cardsCount);
    }, 500);
  });

  return (
    <section className="movieslist">
      <div className="movieslist__items">

      {movies.length > 0 && movies.slice(0, rowNumber + limitCoin).map((el, index) => {
        let isLike;
        if (savedMovies) {
          isLike = savedMovies?.filter((savedListEl) => savedListEl.movieId === el.id);
        } else {
          isLike = savedMovies?.filter((savedListEl) => savedListEl.movieId === el.id);
        }
        return <MoviesCard data={el} key={el.id || index} saveMovie={saveMovie} id={el.id} isLike={isLike} isSaved={isSaved} deleteMovie={deleteMovie} />;
      })}
      </div>
      {movies?.length > rowNumber && (
        <button type="button" className="movieslist__morebtn" onClick={showMoreCards}>
        Ещё
      </button>
      )}
    </section>
  );
}

export default MoviesCardList;
