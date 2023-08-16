import React, { useEffect, useState } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ onUpdateUser, errorAuth, onLogout, isSuccess }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
 
  useEffect(() => {
    setName(currentUser ? currentUser.name : "Виталий");
    setEmail(currentUser ? currentUser.email : "pochta@yandex.ru");
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      email: email,

    });
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
    setHasChanges(true);
    if (evt.target.name === "name" && evt.target.validity.patternMismatch) {
      setNameError("Поле может содержать только латиницу, кириллицу, пробел или дефис");
    } else if (evt.target.name === "name" && evt.target.validationMessage) {
      setNameError(evt.target.validationMessage);
    } else if (evt.target.value === currentUser.name) {
      setNameError("Введенные данные должны отличаться");
      if (!evt.target.value) {
        setNameError("Заполните поле");
      }
    } else {
      setNameError("");
    }
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
    setHasChanges(true);
    if (evt.target.name === "email" && !isValidEmail(evt.target.value)) {
      setEmailError("Необходимо ввести адрес почты");
    } else if (evt.target.name === "email" && !evt.target.validity.valid) {
      setEmailError(evt.target.validationMessage);
    } else if (evt.target.value === currentUser.email) {
      setEmailError("Введенные данные должны отличаться");
      if (!evt.target.value) {
        setEmailError("Заполните поле");
      }
    } else {
      setEmailError("");
    }
  }

  function switchUpdateMode(evt) {
    evt.preventDefault();
    setIsUpdateMode(!isUpdateMode);
  }

  return (
    <>
      <Header />
      <main className="profile">
        <h2 className="profile__hello">Привет, {name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__content">
            <p className="profile__subtitle">Имя</p>
            <div className="profile__fieldset">
              <input className="profile__field" type="text" placeholder="Виталий" name="name" value={name || ""} onChange={handleChangeName} required disabled={!isUpdateMode} />
              <span className={`profile__field_error ${nameError && `profile__field_error_active`}`}>{nameError}</span>
            </div>
          </div>
          <div className="profile__content">
            <p className="profile__subtitle">E-mail</p>
            <div className="profile__fieldset">
              <input className="profile__field" type="email" name="email" placeholder="pochta@yandex.ru" value={email || ""} autoComplete="off" onChange={handleChangeEmail} required disabled={!isUpdateMode} />
              <span className={`profile__field_error ${emailError && `profile__field_error_active`}`}>{emailError}</span>
            </div>
          </div>
          <span className="profile__submit_error" >{errorAuth} {isSuccess}</span>
          {!isUpdateMode && (
            <>
              <button className="profile__btn link" type="button" onClick={switchUpdateMode}>
                Редактировать
              </button>
              <button className="profile__signoutbtn link" type="button" onClick={onLogout}>
                Выйти из аккаунта
              </button>
            </>
          )}
          {isUpdateMode && (
        <>
          <button
            className={`profile_savebtn link ${(!hasChanges || emailError || nameError) && "profile_savebtn_disabled"}`}
            type="submit"
            disabled={!hasChanges || emailError || nameError}
            onClick={handleSubmit}
          >
            Сохранить
          </button>
        </>
      )}
        </form>
      </main>
    </>
  );
}

export default Profile;
