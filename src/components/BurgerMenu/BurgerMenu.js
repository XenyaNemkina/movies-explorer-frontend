import "./BurgerMenu.css";
import { Link, useLocation } from "react-router-dom";
import Account from "../Account/Account";

function BurgerMenu({ isBurger, onClose }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <section className={`burger ${isBurger && "burger_is-open"}`}>
      <div className="burger__menu">
        <button className="burger__closebtn" type="button" onClick={onClose}></button>
        <div className="burger__links">
          <Link to="/" className={`burger__link ${path === "/" && "burger__link_active"} link`} onClick={onClose}>
            Главная
          </Link>
          <Link to="/movies" className={`burger__link ${path === "/movies" && "burger__link_active"} link`} onClick={onClose}>
            Фильмы
          </Link>
          <Link to="/saved-movies" className={`burger__link ${path === "/saved-movies" && "burger__link_active"} link`} onClick={onClose}>
            Сохранённые фильмы
          </Link>
          <Account isBurger={isBurger} />
        </div>
      </div>
    </section>
  );
}

export default BurgerMenu;
