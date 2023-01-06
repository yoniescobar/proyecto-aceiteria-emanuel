const baseUrl = process.env.REACT_APP_BASE_URL;


export const getPermisosUsuario=(idUsuario)=>{
    return fetch(baseUrl+'/UsuarioPermiso/idUsuario/'+idUsuario, { // add return here
                  method:'Get',
              })
              .then(data=> {
               return   data.json()
              })
  }