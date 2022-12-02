const baseUrl = process.env.REACT_APP_BASE_URL;

export const getItemByCode=(code)=>{
    return fetch(baseUrl+'/Articulo/codigo/'+code, { // add return here
                  method:'Get',
              })
              .then(data=> {
               return   data.json()
              })
  }

export const getClienteByCode=(code)=>{
    return fetch(baseUrl+'/Persona/cliente/'+code, { // add return here
                  method:'Get',
              })
              .then(data=> {
               return   data.json()
              })
 }

 export const setEgreso=(data)=>{
    return fetch(baseUrl+'/Egreso', { // add return here
                  method:'POST',
                  body:JSON.stringify(data),
                  headers: {"Content-type": "application/json; charset=UTF-8"}
              })
              .then(data=> {
               return   data.json()
              })
 }

 export const getProductosVenta=()=>{
    return fetch(baseUrl+'/Articulo/ventas', { // add return here
                  method:'Get',
              })
              .then(data=> {
               return   data.json()
              })
 }