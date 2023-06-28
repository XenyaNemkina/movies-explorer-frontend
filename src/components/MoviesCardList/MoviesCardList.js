import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

/* const cardsElements = films.map((card) => {
    return (
    <MoviesCard 
      handleDeleteCard={handleDeleteCard}
      key = {card.movieId}
      card = {card}
      country = {card.country}
      director = {card.director}
      duration = {card.duration}
      year = {card.year}
      description = {card.description}
      image = {card.image}
      trailerLink = {card.trailerLink}
      thumbnail = {card.thumbnail}
      owner = {card.owner}
      movieId = {card.movieId}
      nameRU = {card.nameRU}
      nameEN = {card.nameEN} 
      like = {card.like}
    />)
  }) */

function MoviesCardList() {
  return(
    <section className="movieslist">
       <div className="movieslist__items">
        
       </div>   
    </section>
  )
}

export default MoviesCardList;