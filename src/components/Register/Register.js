import "./Register.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useState } from "react";

function Register(onSubmit) {
  const [isNameError, setIsNameError] = useState("");
  const [isEmailError, setIsEmailError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState("");
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmitRegister = (evt) => {
    evt.preventDefault();
    if (!formValue.name || !formValue.email || !formValue.password) {
      return;
    }
    onSubmit(formValue.name, formValue.email, formValue.password);
    setFormValue({ name: "", email: "", password: "" });
  };
  const handleNameChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setFormValue({ ...formValue, [name]: value });
    if (!evt.target.value) {
      setIsNameError("Что-то пошло не так...");
    }
  };

  const handleEmailChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setFormValue({ ...formValue, [name]: value });
    if (!evt.target.value) {
      setIsEmailError("Что-то пошло не так...");
    }
  };

  const handlePasswordChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setFormValue({ ...formValue, [name]: value });
    if (!evt.target.value) {
      setIsPasswordError("Что-то пошло не так...");
    }
  };

  return (
    <section className="auth__container">
      <Logo />
      <h2 className="auth__title">Добро пожаловать!</h2>
      <form className="auth__form" onSubmit={handleSubmitRegister}>
        <div className="auth__content">
          <p className="auth__subtitle">Имя</p>
          <input className="auth__field" type="text" name="name" value={formValue.name} onChange={handleNameChange} required />
          <span className={`auth__field_error ${isNameError && "auth__field_error_active"}`}>{isNameError}</span>
        </div>
        <div className="auth__content">
          <p className="auth__subtitle">E-mail</p>
          <input className="auth__field" type="email" name="email" autoComplete="off" value={formValue.email} onChange={handleEmailChange} required />
          <span className={`auth__field_error ${isEmailError && "auth__field_error_active"}`}>{isEmailError}</span>
        </div>
        <div className="auth__content">
          <p className="auth__subtitle">Пароль</p>
          <input className="auth__field" type="password" name="password" value={formValue.password} onChange={handlePasswordChange} required />
          <span className={`auth__field_error ${isPasswordError && "auth__field_error_active"}`}>{isPasswordError}</span>
        </div>
        <button type="submit" className="auth__savebtn link" onSubmit={handleSubmitRegister}>
          Зарегистрироваться
        </button>
        <p className="auth__text">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="auth__text_link link">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
