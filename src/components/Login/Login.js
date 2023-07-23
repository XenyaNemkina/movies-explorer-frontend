import "./Login.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import useFormValidation from "../../hooks/useFormValidation";

function Login({onSubmit}) {
  const {values, errors, isFormValid, handleChange, handleResetValidation} = useFormValidation();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    onSubmit(values.email , values.password);
    handleResetValidation()
  }

  return (
    <main className="login__container">
      <Logo />
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmitLogin}>
        <div className="login__content">
          <p className="login__subtitle">E-mail</p>
          <input className="login__field" type="email" name="email" autoComplete="off" value={values.email || ""} onChange={handleChange} required />
          <span className={`login__field_error ${(errors.email) && "login__field_error_active"}`}>{errors.email}</span>
        </div>
        <div className="login__content">
          <p className="login__subtitle">Пароль</p>
          <input className="login__field" type="password" name="password" value={values.password || ""} autoComplete="off" onChange={handleChange} required />
          <span className={`login__field_error ${(errors.password) && "login__field_error_active"}`}>{errors.password}</span>
        </div>
        <button type="submit" className={`login__savebtn link ${!isFormValid && `login__savebtn_disabled`}`} disabled={!isFormValid} onSubmit={handleSubmitLogin}>
          Войти
        </button>
        <p className="login__text">
          Ещё не зарегистрированы?{" "}
          <Link to="/signup" className="login__text_link link">
            Регистрация
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Login;