import "./Header.css";
import Logo from "../Logo/Logo";
import { Link, useLocation } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";

function Header({isBurger, onBurgerClick}) {
  const location = useLocation();
  const path = location.pathname;

  return(
    <div className={`header ${path === "/" && `header__violet`}`}>
      <Logo />
      {path === "/movies" || path === "/saved-movies" || path === "/profile" ? <NavBar isBurger={isBurger} onBurgerClick={onBurgerClick} /> : ""}
        <nav className="header__nav">
          {path === "/" ? (
            <>
              <Link to="/signup" className="header__link_signup link">Регистрация</Link>
              <Link to="/signin" className="header__link_signin link">Войти</Link>
            </> ) : ""}
      </nav>
    </div>
  )
}

export default Header;