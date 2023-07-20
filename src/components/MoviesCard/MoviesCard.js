import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { MOVIES_URL } from "../../utils/constants";

function MoviesCard({movie, isSaved, durationInMins}) {
  const location = useLocation();
  const path = location.pathname;
  
  function timeLength() {
    const hours = Math.floor(durationInMins / 60);
    const mins = durationInMins % 60;
    return (
      (hours > 0 ? `${hours} ч` : '') +
      (mins ? ' ' : '') +
      (mins > 0 ? `${mins} м` : '')
    );
  }


  return (
    <li className="moviesCard">
      <div className="moviesCard__header">
        <h2 className="moviesCard__title">{movie.nameRU}</h2>
        <p className="moviesCard__duration">{timeLength(movie.duration)}</p>
      </div>
      <a className="moviecard__link link" target="_blank" href={movie.trailerLink}>
        <img className="moviesCard__img" src={movie.image} alt="превью фильма" />
      </a>
      {path === "/movies" && <button onClick={""} className={`moviesCard__btn ${isSaved && "moviesCard__btn_saved"} link`} type="button"></button>}
      {path === "/saved-movies" && <button className="moviesCard__btn_delete link" type="button"></button>}
    </li>
  );
}

export default MoviesCard;
