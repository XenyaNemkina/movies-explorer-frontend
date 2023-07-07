import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useState } from "react";

function Profile({ onSubmit }) {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
  });
  const currentUser = useContext(CurrentUserContext);
  const [isError, setIsError] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState("ftrue");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!formValue.name || !formValue.email) {
      return;
    }
    onSubmit(formValue.name, formValue.email, formValue.password);
    setFormValue({ name: "", email: "" });
  };

  function switchUpdateMode(evt) {
    evt.preventDefault();
    setIsUpdateMode(!isUpdateMode);
  }

  const handleChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setFormValue({ ...formValue, [name]: value });
    if (!evt.target.value) {
      setIsError("Что-то пошло не так...");
    }
  };

  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__hello">Привет, </h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__content">
            <p className="profile__subtitle">Имя</p>
            <input className="profile__field" type="text" placeholder="Виталий" name="name" value={formValue.name} onChange={handleChange} required />
          </div>
          <div className="profile__content">
            <p className="profile__subtitle">E-mail</p>
            <input className="profile__field" type="email" name="email" placeholder="pochta@yandex.ru" value={formValue.email} autoComplete="off" onChange={handleChange} required />
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
              <span className="profile__field_error profile__field_error_active">{isError}</span>
              <button className="profile_savebtn link" type="submit" onClick={switchUpdateMode} onSubmit={handleSubmit}>
                Сохранить
              </button>
            </>
          )}
        </form>
      </section>
    </>
  );
}

export default Profile;
