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
