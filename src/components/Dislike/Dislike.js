import './Dislike.css';

function Dislike({deleteMovie}) {
  return (
    <button type="button" className="moviesCard__btn_delete link" onClick={deleteMovie}/>
  )
}

export default Dislike;
