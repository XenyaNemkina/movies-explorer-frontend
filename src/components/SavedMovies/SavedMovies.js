import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({findMovies, handleSmallMetr, toggleSmallMeter, saveMovie, deleteMovie}) {
  return (
    <main className="movies">
      <SearchForm findMovies={findMovies} handleSmallMetr={handleSmallMetr} toggleSmallMeter={toggleSmallMeter} />
      <MoviesCardList isSaved={true} saveMovie={saveMovie} deleteMovie={deleteMovie} />
    </main>
  );
}

export default Movies;
