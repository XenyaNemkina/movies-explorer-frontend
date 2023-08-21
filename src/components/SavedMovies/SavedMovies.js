import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies, findMovies, saveMovie, deleteMovie, text }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isSmallMetr, setIsSmallMetr] = useState(false);

  const handleSmallMetrCheckbox = () => {
      setIsSmallMetr(value => !value);
  }

  useEffect(() => {
    let filteredList = [];
    if (isSmallMetr) {
      filteredList = savedMovies.filter((el) => el.duration < 40);
    } else {
      filteredList = savedMovies;
    }

    setFilteredMovies([...filteredList]);

  }, [isSmallMetr, savedMovies])

  useEffect(() => {
    if (localStorage.getItem('smallMeterSaved')) {
      setIsSmallMetr(JSON.parse(localStorage.getItem('smallMeterSaved')))
    }

    findMovies(undefined, '');
  }, [])

  return (
    <main className="movies">
      <SearchForm 
        findMovies={findMovies} 
        handleSmallMetr={handleSmallMetrCheckbox} 
        toggleSmallMeter={isSmallMetr} 
        type={'saved'}
        text={text}
      />
      <MoviesCardList 
        movies={filteredMovies}
        savedMovies={savedMovies}
        isSaved={true} 
        saveMovie={saveMovie}
        deleteMovie={deleteMovie} 
      />
    </main>
  );
}

export default SavedMovies;
