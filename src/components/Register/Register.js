import "./Register.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { NAME_REG_EXP } from "../../utils/constants";
import useFormValidation from "../../hooks/useFormValidation";

function Register({ errorAuth, onSubmit }) {
  const { values, errors, isFormValid, handleChange, handleResetValidation } = useFormValidation();

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    onSubmit(values.name, values.email, values.password);
    handleResetValidation();
  };

  return (
    <main className="register__container">
      <Logo />
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmitRegister}>
        <div className="register__content">
          <p className="register__subtitle">Имя</p>
          <input className="register__field" type="text" name="name" pattern={NAME_REG_EXP} value={values.name || ""} onChange={handleChange} required />
          <span className={`register__field_error ${errors.name && "register__field_error_active"}`}>{errors.name}</span>
        </div>
        <div className="register__content">
          <p className="register__subtitle">E-mail</p>
          <input className="register__field" type="email" name="email" autoComplete="off" value={values.email || ""} onChange={handleChange} required />
          <span className={`register__field_error ${errors.email && "register__field_error_active"}`}>{errors.email}</span>
        </div>
        <div className="register__content">
          <p className="register__subtitle">Пароль</p>
          <input className="register__field" type="password" name="password" value={values.password || ""} autoComplete="off" onChange={handleChange} required />
          <span className={`register__field_error ${errors.password && "register__field_error_active"}`}>{errors.password}</span>
        </div>
        <span className={"register__field_error_server"}>{errorAuth}</span>
        <button type="submit" className={`register__savebtn link ${!isFormValid && `register__savebtn_disabled`}`} disabled={!isFormValid} onSubmit={handleSubmitRegister}>
          Зарегистрироваться
        </button>
        <p className="register__text">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="register__text_link link">
            Войти
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Register;
