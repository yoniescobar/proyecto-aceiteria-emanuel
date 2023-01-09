export const inputValidator = valueInput => {
  if (!valueInput) {
    return "El campo es un dato obligatorio.";
  }

  return "";
};

export const selectValidator = valueInput => {
  if (valueInput === -1) {
    return "El campo es un dato obligatorio.";
  }

  return "";
};

export const inputValidatorNamesUsuario = valueInput => {
  if (!valueInput ) {

    return "El campo es un dato obligatorio.";
  }
  if (valueInput.length < 5) {
    return "El campo debe tener al menos 4 caracteres.";
  }

  return "";
};

export const inputValidatorPassword = valueInput => {
  if (!valueInput ) {

    return "El campo es un dato obligatorio.";
  }
  if (valueInput.length < 7) {
    return "El campo debe tener al menos 6 caracteres.";
  }
  //if expresion regular..

  return "";
};

export const emailValidator = email => {
  if (!email) {
    return "El campo es un dato obligatorio.";
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return "Formato incorrecto";
  }
  return "";
};