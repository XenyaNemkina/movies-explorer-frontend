import SearchForm from "../SearchForm/SearchForm";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList"

function SavedMovies() {

  const [foundMovies, setFoundMovies] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [areShortiesSeleted, setAreShortiesSeleted] = React.useState(false);

  function handleSearchFormSubmit({ searchText, areShortiesSeleted }) {
    setAreShortiesSeleted(areShortiesSeleted);
    setSearchText(searchText);
  }

  function handleCheckboxChange(value) {
    setAreShortiesSeleted(value);
  }

  React.useEffect(() => {
    if (savedMovies) {
      const foundMovies = searchMovies(
        savedMovies,
        searchText,
        areShortiesSeleted,
      );
      setFoundMovies(foundMovies);
    }
  }, [searchText, areShortiesSeleted, savedMovies]);

  // Сохранение фильмов
  async function handleCardClick(movie) {
    const savedMovie = savedMovies.find(
      (savedMovie) => savedMovie.movieId === movie.movieId,
    );
    await onDeleteSavedMovie(savedMovie);
  } 

  return (
    <main className="savedmovies">
      <SearchForm onSubmit={handleSearchFormSubmit}
          onCheckboxChange={handleCheckboxChange}
          defaultSearchText={searchText}
          defaultAreShortiesSeleted={areShortiesSeleted} />
      <SavedMoviesCardList movies={foundMovies}
          savedMovies={savedMovies}
          onCardClick={handleCardClick}
          isSavedMoviesSearchResult />
    </main>
  );
}

export default SavedMovies;
