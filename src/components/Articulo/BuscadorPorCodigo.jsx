import { useState } from 'react';
import { getItemByCode } from './ArticuloServices';
const baseUrl = process.env.REACT_APP_BASE_URL;

const BuscadorPorCodigo = ({handleAdd}) => {
    const [code, setCode] = useState('');
    const [articulo, setArticulo] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        getItemByCode(code).then(
            data => {
                if(data.id > 0){
                    setArticulo(data.data[0]);
                }else{
                    setArticulo(data.data[0]);
                }
            }
        );
     };    
     
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="row" >
                    <p className="lead"> <b>Buscar producto</b></p>
                    <div className="form-inline">
                        <label for="codigo">Código:   </label>
                        <input
                            type="text"
                            className="form-control mb-2 mr-sm-2"
                            id="codigo"
                            name="codigo"
                            placeholder="Código" 
                            onChange={(e) => setCode(e.target.value)}
                            />
                        <button type="submit" className="btn btn-primary mb-2">Buscar</button>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="input-group">
                        <span className="input-group-text">{articulo.descripcion}</span>
                        <input type="text" aria-label="Precio venta" className="form-control" />
                        <input type="text" aria-label="Cantidad a comprar" className="form-control" />
                        <input type="text" aria-label="Subtotal" className="form-control" />
                        <button 
                            className="btn btn-outline-secondary" 
                            type="button" 
                            id="button-addon2"
                            onClick={event => handleAdd(articulo)}
                            >Agregar</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default BuscadorPorCodigo