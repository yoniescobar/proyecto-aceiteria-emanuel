import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { PeticionGet } from '../../Servicios/PeticionServicio'

const Inventario = () => {
    const componentRef = useRef();

    let creditos = new Array();
    let total = 0;
    let fecha = '';

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Inventario',
    })

    const [DataArticulos, setDataArticulos] = useState([{
        categoria:{nombre:""},
        presentacion:{presentacion: ""},
        nombre: "",
        existencia: 0
    }])

    const cargarDataArticulos = async () => {
        const response = await PeticionGet('Articulo/activos');

        console.log(response.data.data);
        if(response.data.data.length > 0){
            setDataArticulos(response.data.data)
        }   
    }

    useEffect(() => {
        cargarDataArticulos();
    }, []);

    return (
        <>
            <div style={{ width: '100%', height: window.innerHeight }}>
                <h1 className="text-center my-3 border py-2 ">
                    <button type="button" className="btn btn-sm btn-outline-secondary px-3 m-2" onClick={handlePrint}>Imprimir</button>
                    <Link className="btn btn-sm btn-outline-danger px-3 " to="/ventasRealizadas"> cancelar</Link>
                </h1>

                <div ref={componentRef} style={{margin: '10%', margin: '10%', marginTop: '10%', marginRight: '10%', marginBottom: '10%', marginLeft: '10%'}}>
                    <label>Nit: </label><span class="border-0"> 7455225-5</span><br></br>
                    
                    <label>Telefono: </label><span class="border-0"> 7758-8956</span><br></br>
                    <label>Email: </label><span class="border-0"> aceiteraemanuel@gmail.com</span><br></br>
                    {/* <label>Fecha: </label><span class="border-0"> {DataArticulos[0].fecha_doc}</span><br></br>
                    <br></br>

                    <div>
                        <div>
                            <span style={{textAlign: 'right'}}><label>Cliente:</label> {DataArticulos[0].persona.nombre.toUpperCase()}</span>
                            <span style={{marginLeft: '30%', textAlign: 'right'}}><label>Doc:</label> {`${DataArticulos[0].serie_doc.toUpperCase()}-${DataArticulos[0].numero_doc}`}</span>
                            <span style={{marginLeft: '30%', textAlign: 'right'}}><label>Telefono:</label> N/A</span>
                        </div>
                    </div> */}

                    <br></br>
                    <table className='w-85 mx-auto table table-striped' >
                        <thead>
                            <th>Categoria</th>
                            <th>Presentacion</th>
                            <th>Articulo</th>
                            <th>Existencia</th>
                        </thead>
                        <tbody>
                            {DataArticulos.map((item, i)=>{
                                {
                                    total = 0
                                }
                                return(
                                    <tr>
                                        <td>{item.categoria.nombre}</td>
                                        <td>{item.presentacion.presentacion}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.existencia}</td>
                                    </tr>
                                )      
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            
        </>
    )
}

export default Inventario
