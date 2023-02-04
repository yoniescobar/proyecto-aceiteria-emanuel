import axios from 'axios';
import { alertMensaje } from '../utils/alert';

const baseUrl = process.env.REACT_APP_BASE_URL

// Metodo para realizar peticiones get.
export const PeticionGet = async (endpoint) => {
    try {
        return await axios.get(`${baseUrl}/${endpoint}`)
    } catch (error) {
        alertMensaje('Ocurrio un error al intentar consultar los datos, intenta mas tarde.', 'warning')
        
        return false;
    }
};

// Metodo para realizar peticiones delete.
export const PeticionDelete = async (endpoint) => {
    let resultOperacion = false;

    try {
        const resultado = await axios.delete(`${baseUrl}/${endpoint}`)
  
        if (resultado) {
          resultOperacion = true;
          alertMensaje('Datos eliminados con exito!', 'success');
        } else {
          alertMensaje('No es posible eliminar el dato, ya que son datos comprometidos!', 'warning');
        }
    } catch (error) {
        alertMensaje('Ocurrio un error al intentar eliminar los datos!', 'warning');
    }

    return resultOperacion;
};

// Metodo para realizar peticiones post.
export const PeticionPost = async (endpoint, modelo) => {
    let resultOperacion = false;

    try {
        const resultado = await axios.post(`${baseUrl}/${endpoint}`, modelo)

        if (resultado) {
            resultOperacion = true;
            alertMensaje('Datos creado con exito!', 'success');
        } else {
            alertMensaje('Ocurrio un error al intentar crear el registro!', 'warning');
        }
    } catch (error) {
        alertMensaje('Ocurrio un error al intentar craar el registro, intenta mas tarde.', 'warning')
    }
    
    return resultOperacion;
};

// Metodo para realizar peticiones put.
export const PeticionPut = async (endpoint, modelo) => {
    let resultOperacion = false;

    try {
        const resultado = await axios.put(`${baseUrl}/${endpoint}`, modelo)

        if (resultado) {
            resultOperacion = true;
            alertMensaje('Datos actualizados exitosamente!', 'success');
        } else {
            alertMensaje('Ocurrio un error al intentar actualizar los datos!', 'warning');
        }

        return true;
    } catch (error) {
        alertMensaje('Ocurrio un error al intentar actualizar los datos, intenta mas tarde.', 'warning')
    }

    return resultOperacion;
}