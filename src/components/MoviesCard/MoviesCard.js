import "./MoviesCard.css";
import { BASE_URL, MOVIES_URL}  from "../../utils/constants";
import Like from "../Like/Like";
import Dislike from "../Dislike/Dislike";
import { useLocation } from "react-router-dom";

function MoviesCard({data, saveMovie, deleteMovie, isSaved, id, isLike}) {
  let { nameRU, duration, image, trailerLink } = data
  let timeLength = `${Math.floor(duration / 60)}ч ${duration % 60 ? duration % 60 + 'м' : ''}`
  if(timeLength[0] === '0'){
    timeLength = timeLength.split(' ')[1]
  }
  if(!isSaved){
    image = `${MOVIES_URL}${data.image.url}`
  }

  function deleteMovie() {
    const deleteCurrentCard = JSON.parse(localStorage.getItem('savedMoviesList')).filter(el => el.nameRU === nameRU)
    deleteMovie(deleteCurrentCard[0]._id)
  }


  return (
    <li className="moviesCard">
      <div className="moviesCard__header">
        <h2 className="moviesCard__title">{nameRU}</h2>
        <p className="moviesCard__duration">{timeLength}</p>
      </div>
      <a className="moviecard__link link" target="_blank" href={trailerLink}>
        <img className="moviesCard__img" src={image} alt="превью фильма" />
      </a>
      {isSaved ? <Dislike deleteMovie={deleteMovie}/> : <Like saveMovie={saveMovie} id={id} deleteMovie={deleteMovie} isLike={isLike}/>}
    </li>
  );
}

export default MoviesCard;
