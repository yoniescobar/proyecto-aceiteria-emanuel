const baseUrl = process.env.REACT_APP_BASE_URL;


export const getPermisosUsuario=(idUsuario)=>{
    return fetch(baseUrl+'/UsuarioPermiso/idUsuario/'+idUsuario, { // add return here
                  method:'Get',
              })
              .then(data=> {
               return   data.json()
              })
  }

  export const getPermisos=()=>{
    return fetch(baseUrl+'/Permiso/all', { // add return here
                  method:'Get',
              })
              .then(data=> {
               return   data.json()
              })
  }

  export const addUsuarioPermiso=(data)=>{
    return fetch(baseUrl+'/UsuarioPermiso/', { // add return here
                  method:'POST',
                  body:JSON.stringify(data),
                  headers: {"Content-type": "application/json; charset=UTF-8"}
              })
              .then(data=> {
               return   data.json()
              })
 }

 export const delUsuarioPermiso=(id)=>{
    return fetch(baseUrl+'/UsuarioPermiso/id/'+id, { // add return here
                  method:'delete',
              })
              .then(data=> {
               return   data.json()
              })
 }