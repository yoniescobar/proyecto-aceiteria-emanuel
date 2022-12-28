const baseUrl = process.env.REACT_APP_BASE_URL;

export const getEgresoByCodeCliente=(code)=>{
    return fetch(baseUrl+'/Egreso/codigocliente/'+code, { // add return here
                  method:'Get',
              })
              .then(data=> {
               return   data.json()
              })
}

export const updEgreso=(data)=>{
    return fetch(baseUrl+'/Egreso', { // add return here
                  method:'PUT',
                  body:JSON.stringify(data),
                  headers: {"Content-type": "application/json; charset=UTF-8"}
              })
              .then(data=> {
               return   data.json()
              })
 }