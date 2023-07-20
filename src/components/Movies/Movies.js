import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import { MOVIES_URL } from "../../utils/constants";


function Movies({ savedMovies, onAddSavedMovie, onDeleteSavedMovie }) {
 // Данные обо всех фильмах из API
 const [allMovies, setAllMovies] = React.useState([]);
 const [renderedMovies, setRenderedMovies] = React.useState(null);

 /* Значения параметров поиска при загрузке
 const defaultSearchText = localStorage.getItem('searchText') ?? '';
 const defaultAreShortiesSeleted =
   JSON.parse(localStorage.getItem('areShortiesSeleted')) ?? false;
 const defaultFoundMovies =
   JSON.parse(localStorage.getItem('foundMovies')) ?? [];*/

 // Параметры поиска
 const [search, setSearch] = React.useState("");
 /*const [areShortiesSeleted, setAreShortiesSeleted] = React.useState(
   defaultAreShortiesSeleted,
 );*/
 const [foundMovies, setFoundMovies] = React.useState();

 /*// Служебные сообщения
 const [isLoading, setIsLoading] = React.useState(false);
 const [isErrorOnLoading, setIsErrorOnLoading] = React.useState(false);*/

 // Сохранение параметров поиска в localStorage
 React.useEffect(() => {
   localStorage.setItem('search', search);
 //  localStorage.setItem('areShortiesSeleted', areShortiesSeleted);
   localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
 }, [search, foundMovies]);

 function searchMovies(movies, search) {
  if (!movies.length) return movies;
  

 /* if (areShortiesSeleted) {
    foundMovies = foundMovies.filter(
      (movie) => movie.duration <= 40,
    );
  }*/

  const foundMovies = movies.filter((movie) =>
  
    movie.nameRU.toLowerCase().includes(search),
  );
console.log(foundMovies);
  return foundMovies;
}

function formatMovies(movie) {
  return {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: MOVIES_URL.MEDIA_BASE_URL + movie.image.url,
    trailerLink: movie.trailerLink
      ? movie.trailerLink
      : MOVIES_URL.MEDIA_BASE_URL + movie.image.url,
    thumbnail: MOVIES_URL.MEDIA_BASE_URL + movie.image.formats.thumbnail.url,
    movieId: movie.id,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
  };
}
/*
 // Поиск фильмов
 React.useEffect(() => {
   if (allMovies) {
     const foundMovies = searchMovies(
       allMovies,
       search,
      );
     setFoundMovies(foundMovies);
   }
 }, [search, allMovies]);*/

 function filterMovies(movies, search) {
  console.log("tut")
  const toLowerCaseSearch = search.toLowerCase().trim();
  console.log(toLowerCaseSearch)
  const data = movies.filter((movie) => {
   const commonNameRu = movie.nameRU.toLowerCase();
    return  commonNameRu.includes(toLowerCaseSearch)
  })
  return data;
 }

 // Запрос к API
 async function getMovies() {
   try {
     const movies = await moviesApi.getMovies();
      console.log(movies);
    setAllMovies(movies);
    console.log(allMovies);
    if(allMovies) {
      const filteredMovies = await filterMovies(movies, search);
      console.log(filteredMovies)
      localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies))
      setRenderedMovies(filteredMovies);
      console.log(renderedMovies);
      return movies;
   

    }
   } catch {
    console.log("Error!")
   }
  }

 // Действия формы
 function handleSearchSubmit(search) {
  console.log(search);
     setSearch(search);
    getMovies();
 }
/*
 function handleCheckboxChange(value) {
   setAreShortiesSeleted(value);
   if (!allMovies) getMovies();
 }

 // Сохранение фильмов
 async function handleCardClick(movie) {
   const isSaved = savedMovies.some(
     (savedMovie) => savedMovie.movieId === movie.movieId,
   );
   if (isSaved) {
     const savedMovie = savedMovies.find(
       (savedMovie) => savedMovie.movieId === movie.movieId,
     );
     await onDeleteSavedMovie(savedMovie);
   } else {
     await onAddSavedMovie(movie);
   }
 }*/



  return (
    <main className="movies">
      <SearchForm onSubmit={handleSearchSubmit} />
      <MoviesCardList movies={foundMovies} />
    </main>
  );
}

export default Movies;
