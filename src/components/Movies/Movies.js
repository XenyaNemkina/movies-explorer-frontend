import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movieData from  "../../utils/movieData";

function Movies() {
  return(
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={movieData} />      
    </main>
  )
}

export default Movies;