import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { MOVIES_URL } from "../../utils/constants";

function MoviesCard({data, isSaved, id}) {
  let { nameRU, duration, movieImg, trailerLink } = data;
  let timeLength = `${Math.floor(duration / 60)}ч ${duration % 60 ? duration % 60 + 'м' : ''}`
  if(timeLength[0] === '0'){
    timeLength = timeLength.split(' ')[1]
  }
  if(!isSaved){
    movieImg = `${MOVIES_URL}${data.image.url}`
  }
  const location = useLocation();
  const path = location.pathname;

  const saveMovies = () => {
  
  };

  return (
    <li className="moviesCard">
      <div className="moviesCard__header">
        <h2 className="moviesCard__title">{nameRU}</h2>
        <p className="moviesCard__duration">{timeLength}</p>
      </div>
      <a className="moviecard__link link" target="_blank" href={trailerLink}>
        <img className="moviesCard__img" src={movieImg} alt="превью фильма" />
      </a>
      {path === "/movies" && <button onClick={saveMovies} className={`moviesCard__btn ${isSaved && "moviesCard__btn_saved"} link`} type="button"></button>}
      {path === "/saved-movies" && <button className="moviesCard__btn_delete link" type="button"></button>}
    </li>
  );
}

export default MoviesCard;
