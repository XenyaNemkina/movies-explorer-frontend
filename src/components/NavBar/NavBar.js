import "./NavBar.css";
import { Routes, Route, Link } from "react-router-dom";

function NavBar() {
  return(
    <>
    <Routes>
      <Route exact path= { "/movies" } element={
        <div className="header__navbar">
          <Link to="/movies" className="header__link header__link_active">Фильмы</Link>
          <Link to="/saved-movies" className="header__link">Сохранённые фильмы</Link>
          <Link to="/profile" className="header__link">Аккаунт</Link>
        </div>
        }
      />
      <Route exact path= { "/saved-movies" } element={
        <div className="header__navbar">
          <Link to="/movies" className="header__link header__link_active">Фильмы</Link>
          <Link to="/saved-movies" className="header__link">Сохранённые фильмы</Link>
          <Link to="/profile" className="header__link">Аккаунт</Link>
        </div>
        }
      />
      <Route exact path="/" element={
        <div className="header__navbar">
        <Link to="/sign-up" className="header__link_signup">Регистрация</Link>
        <Link to="/sign-in" className="header__link_signin">Войти</Link>
        </div>
        }
      />
    </Routes>
    </>


  )
}

export default NavBar;