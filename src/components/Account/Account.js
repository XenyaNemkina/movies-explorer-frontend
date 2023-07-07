import "./Account.css";
import { NavLink } from "react-router-dom";
import accountLogo from "../../images/icon__account.svg";

function Account({ isBurger }) {
  return (
    <>
      <NavLink className={`account ${isBurger && `account__burger`} link`} to="/profile">
        <img className="account_img" src={accountLogo} alt="значок аккаунта" />
        <p className="account_title">Аккаунт</p>
      </NavLink>
    </>
  );
}

export default Account;
