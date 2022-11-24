import axios from "axios";
import Swal from 'sweetalert2'
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL

const EditProveedor = () => {
  let navigate = useNavigate();

  const { idProveedor } = useParams()

  const [Proveedor, setProveedor] = useState({
    id: "",
    tipo_persona: 2,
    tipo_documento: 0,
    no_documento: "",
    nombre: "",
    direccion: "",
    telefono: "",
    correo: ""
  })

  const { id, tipo_persona, tipo_documento, no_documento, nombre, direccion, telefono, correo } = Proveedor;

  const onInputChange = (e) => {
    setProveedor({ ...Proveedor, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    cargarProveedor()
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setProveedor({ ...Proveedor, ["id"]: idProveedor });
      const resultado = await axios.put(`${baseUrl}/Persona/`, Proveedor);

      if (resultado) {
        mesajeResultado('Los datos fueron actualizados con exito!', 'success');
      } else {
        mesajeResultado('Ocurrio un error al intentar actualizar el proveedor!', 'warning');
      }

      navigate("/tblProveedor");
    } catch (error) {
      mesajeResultado('Ocurrio un error al intentar guardar los datos, intenta mas tarde.', 'warning')
    }
  };

  const cargarProveedor = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Persona/id/${idProveedor}`)
      setProveedor(response.data.data[0])
    } catch (error) {
      mesajeResultado('Ocurrio un error al intentar consultar los datos del proveedor, intenta mas tarde.', 'warning')
    }
  }

  const handleChange = event => {
    setProveedor({ ...Proveedor, ["tipo_documento"]: parseInt(event.target.value) });
  };

  const mesajeResultado = (mensaje, clase) => {
    Swal.fire(
      mensaje,
      '',
      clase
    )
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h2 className="text-center m-4">Editar proveedor</h2>
        <div className="col-12 col-lg-9">
          <section className />
          <div className="clas " />
          <form action className="bg-light my-3 p-3 border rounded" onSubmit={(e) => onSubmit(e)}>
            <div className="form-row mb-4">
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="tipo_documento">Tipo de documento(*):</label>
                <select id="tipo_documento" nombre="tipo_documento" className="form-select appSelect" onChange={handleChange}>
                  {TipoDocumento.map((option) => (
                    <option key={option.id} value={option.id} >{option.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="no_documento">Numero de documento(*):</label>
                <input type="text" name="no_documento" id="no_documento" className="form-control"
                  value={no_documento} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="nombre">Nombre(*):</label>
                <input type="text" name="nombre" id="nombre" className="form-control"
                  value={nombre} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="direccion">Direccion(*):</label>
                <input type="text" name="direccion" id="direccion" className="form-control"
                  value={direccion} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="telefono">Telefono(*):</label>
                <input type="number" name="telefono" id="telefono" className="form-control"
                  value={telefono} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="correo">Correo(*):</label>
                <input type="text" name="correo" id="correo" className="form-control"
                  value={correo} onChange={(e) => onInputChange(e)} />
              </div>
            </div>

            <button type="submit" className="btn btn-outline-primary">Guardar</button>
            <Link className="btn btn-outline-danger mx-2" to="/tblProveedor">Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

const TipoDocumento = [
  { id: -1, nombre: 'Seleccione una opcion' },
  { id: 1, nombre: 'NIT' },
  { id: 2, nombre: 'DPI' }
];

export default EditProveedor