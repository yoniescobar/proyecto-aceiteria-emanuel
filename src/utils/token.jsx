export const getUser = () => {
    const usrStr = sessionStorage.getItem("user");
    if (usrStr) return JSON.parse(usrStr);
    else return null;
  };
  
  export const getIdusuario = () => {
    return sessionStorage.getItem("idusuario") || null;
  };
  
  export const getToken = () => {
    return sessionStorage.getItem("token");
  };
  
  export const setUserSession = (token, user, idusuario) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("idusuario", idusuario);
  };
  
  export const removeUserSession = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("idusuario");
  };
  