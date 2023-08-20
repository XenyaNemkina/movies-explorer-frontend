import "./MoviesCard.css";
import { MOVIES_URL } from "../../utils/constants";
import Like from "../Like/Like";
import Dislike from "../Dislike/Dislike";

function MoviesCard({ data, saveMovie, deleteMovie, isSaved, isLike }) {
  let { nameRU, duration, image, trailerLink, thumbnail } = data;
  let timeLength = `${Math.floor(duration / 60)}ч ${duration % 60 ? (duration % 60) + "м" : ""}`;
  if (timeLength[0] === "0") {
    timeLength = timeLength.split(" ")[1];
  }
  if (!isSaved) {
    image = thumbnail ? thumbnail : `${MOVIES_URL}${data.image.url}`;
  }

  function delMovie() {
    const deleteCurrentCard = JSON.parse(localStorage.getItem("savedMoviesList")).filter((el) => el.nameRU === nameRU);
    deleteMovie(deleteCurrentCard[0]._id);
  }

  return (
    <li className="moviesCard">
      <div className="moviesCard__header">
        <h2 className="moviesCard__title">{nameRU}</h2>
        <p className="moviesCard__duration">{timeLength}</p>
      </div>
      <a className="moviecard__link link" target="_blank" href={trailerLink}>
        <img className="moviesCard__img" src={thumbnail || image} alt="превью фильма" />
      </a>
      {isSaved ? <Dislike delMovie={delMovie} /> : <Like saveMovie={saveMovie} data={data} delMovie={delMovie} isLike={isLike} />}
    </li>
  );
}

export default MoviesCard;
