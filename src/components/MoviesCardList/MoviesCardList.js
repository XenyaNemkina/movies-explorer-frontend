import "./MoviesCardList.css";
import { React, useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

/*function MoviesCardList({ movies }) {
 const CARDS_RENDER_COUNT = {
    1: {
      INITIAL: 5,
      ADD: 2,
    },
    2: {
      INITIAL: 8,
      ADD: 2,
    },
    3: {
      INITIAL: 12,
      ADD: 3,
    },
    default: {
      INITIAL: 6,
      ADD: 6,
    },
  };
  const [renderedMovies, setRenderedMovies] = React.useState([""]);
  /*const grid = React.useRef();

  React.useEffect(() => {
    if (movies.length) {
      const columnsCount = countGridColumns(grid.current);
      const initialCardsCount =
        CARDS_RENDER_COUNT[columnsCount]?.INITIAL ??
        CARDS_RENDER_COUNT['default'].INITIAL;
      const array = movies.slice(0, initialCardsCount);
      setRenderedMovies(array);
    }
  }, [movies]);

  function countGridColumns(gridElement) {
    const gridComputedStyle = window.getComputedStyle(gridElement);
    return gridComputedStyle.getPropertyValue('grid-template-columns').split(' ')
      .length;
  }

  function handleMoreClick() {
    const columnsCount = countGridColumns(grid.current);
    const renderedCountFixed =
      Math.ceil(renderedMovies.length / columnsCount) * columnsCount;
    const moreCardsCount =
      CARDS_RENDER_COUNT[columnsCount]?.ADD ??
      CARDS_RENDER_COUNT['default'].ADD;
    const array = movies.slice(0, renderedCountFixed + moreCardsCount);
    setRenderedMovies(array);
  }

  function checkIsMovieSaved(movie) {
    return savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId);
  }

  return (
    <section className="movieslist">
      <ul className="movieslist__items" >
      {renderedMovies.map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              key={movie.movieId}
              
            />
          )
        })}
      </ul>
      {renderedMovies.length < movies.length && (
         <div className="more section">
         <button className="more__button" type="button" onClick={""}>
          </button>
       </div>
      )}
    </section>
  );*/

  function MoviesCardList() {
    const [movies, setMovies] = useState([]);
  
    useEffect(() => {
      setMovies(movies);
    }, []);
  
    const cardsElements =movies.map((card) => {
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
