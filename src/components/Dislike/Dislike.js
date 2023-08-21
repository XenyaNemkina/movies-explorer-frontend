import "./Dislike.css";

function Dislike({ delMovie }) {
  return <button type="button" className="moviesCard__btn_delete link" onClick={delMovie} />;
}

export default Dislike;
