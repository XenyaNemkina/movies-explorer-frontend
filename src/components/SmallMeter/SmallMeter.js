import React, { useState } from "react";
import "./SmallMeter.css";

function SmallMeter({ handleSmallMetr, toggleSmallMeter, type }) {
  const lsName = type === 'all' ? 'smallMeter' : 'smallMeterSaved'
  const [isChecked, setIsChecked] = useState(type === 'all' ? (localStorage.getItem(lsName) === "true" ? true : false) : false);
 
  function actionSmallMetr(e) {
    const updatedValue = !isChecked;
    setIsChecked(updatedValue);
    handleSmallMetr();

    if (type === 'all') {
      localStorage.setItem(lsName, updatedValue.toString());
    }
  }

  return (
    <div className="searchform__filter">
      <button className={`searchform__checkbox ${isChecked ? "searchform__checkbox_checked" : ""}`} type="button" onClick={actionSmallMetr} />
      <p className="searchform__text">Короткометражки</p>
    </div>
  );
}

export default SmallMeter;
