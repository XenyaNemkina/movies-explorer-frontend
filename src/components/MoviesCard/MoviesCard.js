import "./MoviesCard.css";
import movieImg from "../../images/pic__COLOR_pic.png"

function MoviesCard() {
  return(
    <li className="moviesCard">
      <div className="moviesCard__header">
        <h2 className="moviesCard__title">В погоне за Бенкси</h2>
        <p className="moviesCard__duration">27 минут</p>
      </div>
      <img className="moviesCard__img" src={movieImg} alt="В погоне за Бенкси" />
      <button className="moviesCard__savebtn">Сохранить</button>
    </li>
  )
}

export default MoviesCard;