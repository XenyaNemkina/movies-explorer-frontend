import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  function handleClickBack() {
    navigate(-1);
  }

  return (
    <main className="page-not-found">
      <h2 className="page-not-found__title">404</h2>
      <p className="page-not-found__subtitle">Страница не найдена</p>
      <button className="page-not-found__backbtn link" type="button" onClick={handleClickBack}>
        Назад
      </button>
    </main>
  );
}

export default NotFound;
