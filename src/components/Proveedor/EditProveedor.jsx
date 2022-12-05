import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PeticionGet, PeticionPut } from '../../Servicios/PeticionServicio'

const baseUrl = process.env.REACT_APP_BASE_URL

const EditProveedor = () => {
  let navigate = useNavigate();

  const { idProveedor } = useParams()

  const [Proveedor, setProveedor] = useState({
    id: "",
    tipopersona: 2,
    tipo_documento: 0,
    no_documento: "",
    nombre: "",
    direccion: "",
    telefono: "",
    correo: ""
  })

  const { id, tipopersona, tipo_documento, no_documento, nombre, direccion, telefono, correo, estado } = Proveedor;

  const onInputChange = (e) => {
    setProveedor({ ...Proveedor, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    cargarProveedor()
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    setProveedor({ ...Proveedor, ["id"]: idProveedor });
    const resultado = await PeticionPut('Persona/', Proveedor);

    if (resultado) {
      navigate("/tblProveedor");
    }
  };

  const cargarProveedor = async () => {
    const response = await PeticionGet(`Persona/id/${idProveedor}`);
    
    if (response) {
      setProveedor(response.data.data[0])
    }
  }

  const handleChange = event => {
    setProveedor({ ...Proveedor, [event.target.name]: parseInt(event.target.value) });
  };

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
                <select id="tipo_documento" name="tipo_documento" className="form-select appSelect" onChange={handleChange}>
                  {ListaTipoDocumento.map((option) => (
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

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="tipo_documento">Estado(*):</label>
                <select id="tipo_documento" name="estado" className="form-select appSelect" onChange={handleChange}>
                  {ListaEstado.map((option) => (
                    <option key={option.id} value={option.id} >{option.nombre}</option>
                  ))}
                </select>
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

const ListaTipoDocumento = [
  { id: -1, nombre: 'Seleccione una opcion' },
  { id: 1, nombre: 'NIT' },
  { id: 2, nombre: 'DPI' }
];

const ListaEstado = [
  { id: -1, nombre: 'Seleccione una opcion' },
  { id: 1, nombre: 'Activo' },
  { id: 2, nombre: 'No activo' }
];

export default EditProveedor