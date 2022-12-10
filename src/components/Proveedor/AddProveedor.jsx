import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { PeticionPost } from '../../Servicios/PeticionServicio'
import { ListaTipoDocumento, ListaEstado } from '../../Constantes/ListasSelect'

const AddProveedor = () => {
    let navigate = useNavigate();
    const [Proveedor, setProveedor] = useState({
        tipopersona: 2,
        tipo_documento: 0,
        nodocumento: "",
        nombre: "",
        direccion: "",
        telefono: "",
        correo: ""
    })

    const { tipopersona, tipo_documento, nodocumento, nombre, direccion, telefono, correo } = Proveedor;

    const onInputChange = (e) => {
        setProveedor({ ...Proveedor, [e.target.name]: e.target.value });
    };

    const handleChange = event => {
        setProveedor({ ...Proveedor, [event.target.name]: parseInt(event.target.value) });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const resultado = await PeticionPost('Persona', Proveedor);

        if (resultado) {
            navigate("/tblProveedor");
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h2 className="text-center m-4">Registro de proveedor</h2>
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
                                <label htmlFor="nodocumento">Numero de documento(*):</label>
                                <input type="text" name="nodocumento" id="nodocumento" className="form-control"
                                    value={nodocumento} onChange={(e) => onInputChange(e)} />
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
                                <label htmlFor="estado">Estado(*):</label>
                                <select id="estado" name="estado" className="form-select appSelect" onChange={handleChange}>
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

export default AddProveedor