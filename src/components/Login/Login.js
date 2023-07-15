import "./Login.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useState } from "react";

function Login({ onSubmit }) {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    onSubmit(formValue.email, formValue.password);
    setFormValue({ email: "", password: "" });
  };

  const handleEmailChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setFormValue({ ...formValue, [name]: value });
    if (!evt.target.value) {
      setEmailError("Что-то пошло не так...");
    }
  };

  const handlePasswordChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setFormValue({ ...formValue, [name]: value });
    if (!evt.target.value) {
      setPasswordError("Что-то пошло не так...");
    }
  };

  return (
    <main className="login__container">
      <Logo />
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmitLogin}>
        <div className="login__content">
          <p className="login__subtitle">E-mail</p>
          <input className="login__field" type="email" name="email" autoComplete="off" value={formValue.email} onChange={handleEmailChange} required />
          <span className={`login__field_error ${emailError && "login__field_error_active"}`}>{emailError}</span>
        </div>
        <div className="login__content">
          <p className="login__subtitle">Пароль</p>
          <input className="login__field" type="password" name="password" value={formValue.password} onChange={handlePasswordChange} required />
          <span className={`login__field_error ${passwordError && "login__field_error_active"}`}>{passwordError}</span>
        </div>
        <button type="submit" className="login__savebtn link" onSubmit={handleSubmitLogin}>
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