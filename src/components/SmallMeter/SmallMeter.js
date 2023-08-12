import React, { useState } from "react";
import "./SmallMeter.css";

function SmallMeter({ handleSmallMetr }) {
  const [isChecked, setIsChecked] = useState(localStorage.getItem("smallMeter") === "true" ? true : false);
 
  function actionSmallMetr(e) {
    const updatedValue = !isChecked;
    setIsChecked(updatedValue);
    handleSmallMetr();
    localStorage.setItem("smallMeter", updatedValue.toString());
  }

  return (
    <div className="searchform__filter">
      <button className={`searchform__checkbox ${isChecked ? "searchform__checkbox_checked" : ""}`} type="button" onClick={actionSmallMetr} />
      <p className="searchform__text">Короткометражки</p>
    </div>
  );
}

export default SmallMeter;
