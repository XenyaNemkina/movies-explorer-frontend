import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movieData from  "../../utils/movieData";

function SavedMovies() {
  return(
    <main className="savedmovies">
      <SearchForm />
      <MoviesCardList movies={movieData} />      
    </main>
  )
}

export default SavedMovies;