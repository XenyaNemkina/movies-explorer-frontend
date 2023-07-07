import "./MoviesCardList.css";
import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import movies from "../../utils/movieData";

function MoviesCardList() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    setFilms(movies);
  }, []);

  const cardsElements = films.map((card) => {
    return (
      <MoviesCard
        key={card.movieId}
        card={card}
        country={card.country}
        director={card.director}
        duration={card.duration}
        year={card.year}
        description={card.description}
        image={card.image}
        trailerLink={card.trailerLink}
        thumbnail={card.thumbnail}
        owner={card.owner}
        movieId={card.movieId}
        nameRU={card.nameRU}
        nameEN={card.nameEN}
        like={card.like}
      />
    );
  });
  return (
    <section className="movieslist">
      <ul className="movieslist__items">{cardsElements}</ul>
      <button className="movieslist__morebtn link" type="button">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
