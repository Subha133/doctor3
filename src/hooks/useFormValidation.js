import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+]?[\d\s\-()]{8,15}$/;

export function useFormValidation(initialState) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (fieldValues = values) => {
    const errs = {};

    if ("name" in fieldValues) {
      if (!fieldValues.name.trim()) errs.name = "Full name is required.";
      else if (fieldValues.name.trim().length < 2) errs.name = "Name must be at least 2 characters.";
    }

    if ("phone" in fieldValues) {
      if (!fieldValues.phone.trim()) errs.phone = "Phone number is required.";
      else if (!phoneRegex.test(fieldValues.phone)) errs.phone = "Enter a valid phone number.";
    }

    if ("email" in fieldValues) {
      if (!fieldValues.email.trim()) errs.email = "Email address is required.";
      else if (!emailRegex.test(fieldValues.email)) errs.email = "Enter a valid email address.";
    }

    if ("date" in fieldValues) {
      if (!fieldValues.date) errs.date = "Preferred date is required.";
    }

    if ("time" in fieldValues) {
      if (!fieldValues.time) errs.time = "Preferred time is required.";
    }

    if ("problem" in fieldValues) {
      if (!fieldValues.problem.trim()) errs.problem = "Please describe your concern.";
      else if (fieldValues.problem.trim().length < 10) errs.problem = "Please provide more detail (at least 10 characters).";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        ...validate({ [name]: value }),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      ...validate({ [name]: value }),
    }));
  };

  const isValid = () => {
    const errs = validate();
    setErrors(errs);
    setTouched(
      Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    return Object.keys(errs).length === 0;
  };

  const reset = () => {
    setValues(initialState);
    setErrors({});
    setTouched({});
  };

  return { values, errors, touched, handleChange, handleBlur, isValid, reset };
}
