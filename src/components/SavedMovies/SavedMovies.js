import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ findMovies, handleSmallMetr, toggleSmallMeter, saveMovie, deleteMovie, text }) {
  return (
    <main className="movies">
      <SearchForm findMovies={findMovies} handleSmallMetr={handleSmallMetr} toggleSmallMeter={toggleSmallMeter} text={text} />
      <MoviesCardList isSaved={true} saveMovie={saveMovie} deleteMovie={deleteMovie} />
    </main>
  );
}

export default SavedMovies;
