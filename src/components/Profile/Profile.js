import React, { useContext, useState } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ onSubmit, currentUser }) {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const handleSubmit = (evt) => {

  };

  function switchUpdateMode(evt) {
    evt.preventDefault();
    setIsUpdateMode(!isUpdateMode);
  }

  const handleChange = (evt) => {
 
  };

  return (
    <>
      <Header />
      <main className="profile">
        <h2 className="profile__hello">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__content">
            <p className="profile__subtitle">Имя</p>
            <div className="profile__fieldset">
              <input className="profile__field" type="text" placeholder="Виталий" name="name" value={name || currentUser.name} onChange={handleChange} required disabled={!isUpdateMode} />
              <span className="profile__error"></span>
            </div>
          </div>
          <div className="profile__content">
            <p className="profile__subtitle">E-mail</p>
            <div className="profile__fieldset">
            <input className="profile__field" type="email" name="email" placeholder="pochta@yandex.ru" value={email || currentUser.email} autoComplete="off" onChange={handleChange} required disabled={!isUpdateMode} />
              <span className="profile__error"></span>
            </div>
           </div>
          {!isUpdateMode && (
            <>
              <button className="profile__btn link" type="button" onClick={switchUpdateMode}>
                Редактировать
              </button>
              <button className="profile__signoutbtn link" type="button">
                Выйти из аккаунта
              </button>
            </>
          )}
          {isUpdateMode && (
            <>
              <span className="profile__field_error profile__field_error_active">{error}</span>
              <button className="profile_savebtn link" type="submit" onClick={switchUpdateMode} onSubmit={handleSubmit}>
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
