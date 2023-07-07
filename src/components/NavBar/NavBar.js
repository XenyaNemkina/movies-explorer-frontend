import "./NavBar.css";
import { NavLink, useLocation } from "react-router-dom";
import Account from "../Account/Account.js";

function NavBar({ onBurgerClick }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="navbar">
      <div className="navbar__movies">
        <NavLink className={`navbar__movie ${path === "/movies" && "navbar__movie_active"} link`} to="/movies">
          Фильмы
        </NavLink>
        <NavLink className={`navbar__movie ${path === "/saved-movies" && "navbar__movie_active"} link`} to="/saved-movies">
          Сохранённые фильмы
        </NavLink>
      </div>
      <Account />
      <button className="navbar__burger link" onClick={onBurgerClick}></button>
    </nav>
  );
}

export default NavBar;
