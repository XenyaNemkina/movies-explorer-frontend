import "./Logo.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Logo() {
  return (
    <Link className="header__logo" to="/">
      <img className="header__logo_img link" src={logo} alt="логотип" />
    </Link>
  );
}

export default Logo;
