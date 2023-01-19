import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { PeticionGet } from '../../Servicios/PeticionServicio'

const Inventario = () => {
    const componentRef = useRef();
    let total = 0;

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

        if(response.data.data.length > 0){
            console.log(response.data.data);
            setDataArticulos(response.data.data)
        }   
    }

    useEffect(() => {
        cargarDataArticulos();
    }, []);

    return (
        <>
            <div style={{ width: '100%', height: window.innerHeight }}>
                <div className="mx-auto table table-striped">
                    <div className="row">
                        <div className="col-sm d-flex justify-content-center">
                            <h1 className="text-center">
                                <button type="button" className="btn btn-sm btn-outline-secondary px-3 m-2" onClick={handlePrint}>Imprimir</button>
                                <Link className="btn btn-sm btn-outline-danger px-3 " to="/ventasRealizadas"> cancelar</Link>
                            </h1>
                        </div>
                    </div>
                </div>
                <hr></hr>

                <div ref={componentRef} style={{margin: '10%', margin: '10%', marginTop: '3%', marginRight: '10%', marginBottom: '10%', marginLeft: '10%'}}>
                    <h1 style={{ textAlign: 'center' }}>Aceitera Emanuel</h1>
                    <br></br>
                    <label>Nit: </label><span class="border-0"> 7455225-5</span><br></br>
                    
                    <label>Telefono: </label><span class="border-0"> 7758-8956</span><br></br>
                    <label>Email: </label><span class="border-0"> aceiteraemanuel@gmail.com</span><br></br>
                    <br></br>
                    <table className='w-85 mx-auto table table-striped' >
                        <thead>
                            <th>Categoria</th>
                            <th>Presentacion</th>
                            <th>Articulo</th>
                            <th>Stoc minimo</th>
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
                                        <td>{item.stokminimo}</td>
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
