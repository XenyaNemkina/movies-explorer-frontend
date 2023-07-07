import "./MoviesCard.css";
import movieImg from "../../images/pic__COLOR_pic.png";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function MoviesCard() {
  const location = useLocation();
  const path = location.pathname;
  const [isSaved, setIsSaved] = useState(false);

  const saveMovies = () => {
    setIsSaved(!isSaved);
  };

  return (
    <li className="moviesCard">
      <div className="moviesCard__header">
        <h2 className="moviesCard__title">В погоне за Бенкси</h2>
        <p className="moviesCard__duration">27 минут</p>
      </div>
      <img className="moviesCard__img" src={movieImg} alt="В погоне за Бенкси" />
      {path === "/movies" && <button onClick={saveMovies} className={`moviesCard__btn ${isSaved && "moviesCard__btn_saved"} link`} type="button"></button>}
      {path === "/saved-movies" && <button className="moviesCard__btn_delete link" type="button"></button>}
    </li>
  );
}

export default MoviesCard;
