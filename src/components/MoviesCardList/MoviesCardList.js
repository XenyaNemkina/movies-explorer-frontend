import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import useWindowDimensions from "../../utils/changeWindow";
import { SMALL_WINDOW_WIDTH, MEDIUM_WINDOW_WIDTH, SMALL_ROW_NUMBER, SMALL_ADD_MOVIE_ROW, MEDIUM_ROW_NUMBER, MEDIUM_ADD_MOVIE_ROW, LARGE_ROW_NUMBER, LARGE_ADD_MOVIE_ROW } from "../../utils/constants";

function MoviesCardList({ isSaved, saveMovie, deleteMovie }) {
  const [numberOfMoviesDisplayed, setNumberOfMoviesDisplayed] = useState(localStorage.getItem("numberOfMoviesDisplayed"));
  let windowWidth = useWindowDimensions().width;
  let rowNumber;
  let addMovieRow;

  if (windowWidth < SMALL_WINDOW_WIDTH) {
    rowNumber = SMALL_ROW_NUMBER;
    addMovieRow = SMALL_ADD_MOVIE_ROW;
  } else if (windowWidth >= SMALL_WINDOW_WIDTH && windowWidth < MEDIUM_WINDOW_WIDTH) {
    rowNumber = MEDIUM_ROW_NUMBER;
    addMovieRow = MEDIUM_ADD_MOVIE_ROW;
  } else {
    rowNumber = LARGE_ROW_NUMBER;
    addMovieRow = LARGE_ADD_MOVIE_ROW;
  }

  if (+numberOfMoviesDisplayed < 4) {
    localStorage.setItem("numberOfMoviesDisplayed", rowNumber.toString());
    setNumberOfMoviesDisplayed(rowNumber.toString());
  }

  const findList = JSON.parse(localStorage.getItem("findList"));

  const savedList = JSON.parse(localStorage.getItem("savedMoviesList"));
  let displaySearchSavedMovies;
  if (localStorage.getItem("valueInputSavedMovies")?.length) {
    displaySearchSavedMovies = JSON.parse(localStorage.getItem("SavedMovieslistMatchInput"));
  }
  const [limitCoin, setLimitCoin] = useState(Number(numberOfMoviesDisplayed));
  const [buttonVisible, setButtonVisible] = useState(false);

  function renderLimiter(value = 0) {
    setLimitCoin((prev) => prev + addMovieRow);
    localStorage.setItem("numberOfMoviesDisplayed", (+limitCoin + addMovieRow).toString());
  }

  function disableButton(value) {
    setButtonVisible(value);
  }

  useEffect(() => {
    if (Number(localStorage.getItem("numberOfMoviesDisplayed")) === 0) {
      localStorage.setItem("numberOfMoviesDisplayed", rowNumber.toString());
      setLimitCoin(rowNumber);
      disableButton(false);
    }
  }, [localStorage.getItem("numberOfMoviesDisplayed"), windowWidth]);

  if (limitCoin > findList?.length) {
    setLimitCoin(findList.length - 1);
    disableButton(true);
  }

  return (
    <section className="movieslist">
      <div className="movieslist__items">
        {displaySearchSavedMovies?.length && isSaved
          ? displaySearchSavedMovies.map((el) => <MoviesCard data={el} id={el.id ? el.movieId : el.id} key={el.movieId + Math.random()} isSaved={true} deleteMovie={deleteMovie} />)
          : isSaved
          ? savedList?.map((el) => <MoviesCard data={el} id={el.movieId ? el.movieId : el.id} key={el.movieId + Math.random()} isSaved={true} deleteMovie={deleteMovie} />)
          : findList?.length - limitCoin <= 1
          ? findList?.map((el) => {
              let isLike;
              if (savedList) {
                isLike = savedList.filter((savedListEl) => savedListEl.movieId === el.id);
              } else {
                isLike = savedList?.filter((savedListEl) => savedListEl.movieId === el.id);
              }
              return <MoviesCard data={el} key={el.id} saveMovie={saveMovie} id={el.id} isLike={isLike} deleteMovie={deleteMovie} />;
            })
          : findList?.length > 4
          ? findList.slice(0, limitCoin).map((el) => {
              let isLike;
              if (savedList) {
                isLike = savedList.filter((savedListEl) => savedListEl.movieId === el.id);
              } else {
                isLike = savedList?.filter((savedListEl) => savedListEl.movieId === el.id);
              }
              return <MoviesCard data={el} key={el.id} saveMovie={saveMovie} id={el.id} isLike={isLike} deleteMovie={deleteMovie} />;
            })
          : findList?.length < 4 &&
            findList?.length > 0 &&
            findList.map((el) => {
              let isLike;
              if (savedList) {
                isLike = savedList.filter((savedListEl) => savedListEl.movieId === el.id);
              } else {
                isLike = savedList?.filter((savedListEl) => savedListEl.movieId === el.id);
              }
              return <MoviesCard data={el} key={el.id} saveMovie={saveMovie} id={el.id} isLike={isLike} deleteMovie={deleteMovie} />;
            })}
      </div>
      {isSaved && findList?.length !== 0 && buttonVisible && (
        <button type="button" className="movieslist__morebtn" onClick={renderLimiter}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
