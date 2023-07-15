import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({movieData}) {
  return (
    <main className="savedmovies">
      <SearchForm />
      <MoviesCardList movies={movieData} />
    </main>
  );
}

export default SavedMovies;
