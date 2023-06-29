import "./Header.css";
import logo from "../../images/logo.svg";
import NavBar from "../NavBar/NavBar";

function Header() {
  return(
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <NavBar />
    </header>
  )
}

export default Header;