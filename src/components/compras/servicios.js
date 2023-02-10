const baseUrl = process.env.REACT_APP_BASE_URL;


export const getItemByCode = (code) => {
    return fetch(baseUrl+'/Articulo/codigo/'+code, { // add return here
                  method:'Get',
              })
              .then(data=> {
               return   data.json()
              })
}