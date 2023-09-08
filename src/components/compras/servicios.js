const baseUrl = process.env.REACT_APP_BASE_URL;


export const getItemByCode = (code) => {
    return fetch(baseUrl+'/Articulo/codigo/'+code, { // add return here
                  method:'Get',
              })
              .then(data=> {
               return   data.json()
              })
}

export const getIngresos=()=>{
    return fetch(baseUrl+'/Ingreso/all', { // add return here
                  method:'Get',
              })
              .then(data=> {
               return   data.json()
              })
 }
 export const delIngreso=(id)=>{
    return fetch(baseUrl+'/Ingreso/id/'+id, { // add return here
                  method:'delete',
              })
              .then(data=> {
               return   data.json()
              })
 }