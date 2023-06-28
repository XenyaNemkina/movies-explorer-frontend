import "./MoviesCard.css";

function MoviesCard() {
  return(
    <div className="moviesCard">
      <div className="moviesCard__header">
        <h2 className="moviesCard__title"></h2>
        <p className="moviesCard__duration"></p>
      </div>
      <img className="moviesCard__img" src={""} alt={""} />
      <button className="moviesCard__savebtn"></button>
    </div>
  )
}

export default MoviesCard;