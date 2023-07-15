import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({movieData}) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={movieData} />
    </main>
  );
}

export default Movies;
