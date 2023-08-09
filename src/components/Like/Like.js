import "./Like.css";

function Like({ saveMovie, data, delMovie, isLike }) {
  const isLiked = isLike?.length ? "moviesCard__btn_saved" : "";
  function changeLike() {
    if (isLiked) {
      delMovie(data);
    } else {
      saveMovie(data);
    }
  }
  return <button type="button" className={`moviesCard__btn ${isLiked} link`} onClick={changeLike} />;
}

export default Like;
