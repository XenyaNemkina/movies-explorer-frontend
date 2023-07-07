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
    onsubmit(formValue.email, formValue.password);
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
    <section className="auth__container">
      <Logo />
      <h2 className="auth__title">Рады видеть!</h2>
      <form className="auth__form" onSubmit={handleSubmitLogin}>
        <div className="auth__content">
          <p className="auth__subtitle">E-mail</p>
          <input className="auth__field" type="email" name="email" autoComplete="off" value={formValue.email} onChange={handleEmailChange} required />
          <span className={`auth__field_error ${emailError && "auth__field_error_active"}`}>{emailError}</span>
        </div>
        <div className="auth__content">
          <p className="auth__subtitle">Пароль</p>
          <input className="auth__field" type="password" name="password" value={formValue.password} onChange={handlePasswordChange} required />
          <span className={`auth__field_error ${passwordError && "auth__field_error_active"}`}>{passwordError}</span>
        </div>
        <button type="submit" className="auth__savebtn link" onSubmit={handleSubmitLogin}>
          Войти
        </button>
        <p className="auth__text">
          Ещё не зарегистрированы?{" "}
          <Link to="/signup" className="auth__text_link link">
            Регистрация
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
