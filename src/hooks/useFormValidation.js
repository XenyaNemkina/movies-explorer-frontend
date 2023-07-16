import { useCallback, useState } from "react";

function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setFormValid] = useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function handleChange(e) {
    const target = e.target;

    if(target.name === 'name' && target.validity.patternMismatch) {
      target.setCustomValidity('Поле может содержать только латиницу, кириллицу, пробел или дефис');
    } else if (target.name === 'email' && !isValidEmail(target.value)) {
      target.setCustomValidity('Необходимо ввести адрес почты');
    } else {
      target.setCustomValidity('');
    }
    setValues({...values,[target.name]: target.value});
    setErrors({...errors, [target.name]: target.validationMessage});
    setFormValid(target.closest('form').checkValidity());
  }

  const handleResetValidation = useCallback(() => {
      setFormValid(false);
      setValues({});
      setErrors({});
    },
    [setFormValid, setValues, setErrors]
  );

  return {
    values,errors,isFormValid,handleChange,handleResetValidation,
  }
}

export default useFormValidation;