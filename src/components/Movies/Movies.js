import React, {useState, useEffect} from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ savedMovies, findMovies, saveMovie, deleteMovie, text, movies }) {
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [isSmallMetr, setIsSmallMetr] = useState(false);

  const handleSmallMetrCheckbox = () => {
    setIsSmallMetr(value => !value);
}

useEffect(() => {
  if (movies) {

    let filteredList = [];
    if (isSmallMetr) {
      filteredList = movies?.filter((el) => el.duration < 40);
    } else {
      filteredList = movies;
    }
    setFilteredMovies([...filteredList]);
  }
}, [isSmallMetr, movies])


  useEffect(() => {
    if (localStorage.getItem('smallMeter')) {
      setIsSmallMetr(JSON.parse(localStorage.getItem('smallMeter')))
    }
  }, [])

  return (
    <main className="movies">
      <SearchForm 
        findMovies={findMovies} 
        handleSmallMetr={handleSmallMetrCheckbox}
        toggleSmallMeter={isSmallMetr}
        text={text} 
      />
      <MoviesCardList
        savedMovies={savedMovies}
        movies={filteredMovies}
        isSaved={false}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie} 
      />
    </main>
  );
}

export default Movies;
