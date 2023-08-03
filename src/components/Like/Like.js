import "./Like.css";

function Like({ saveMovie, id, delMovie, isLike }) {
  const isLiked = isLike?.length ? "moviesCard__btn_saved" : "";
  function changeLike() {
    if (isLiked) {
      delMovie(id);
    } else {
      saveMovie(id);
    }
  }
  return <button type="button" className={`moviesCard__btn ${isLiked} link`} onClick={changeLike} />;
}

export default Like;
