import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({findMovies, handleSmallMetr, toggleSmallMeter, movieSave, deleteMovie }) {
  return (
    <main className="movies">
      <SearchForm findMovies={findMovies} handleSmallMetr={handleSmallMetr} toggleSmallMeter={toggleSmallMeter} />
      <MoviesCardList movieSave={movieSave} deleteMovie={deleteMovie} />
    </main>
  );
}

export default Movies;
