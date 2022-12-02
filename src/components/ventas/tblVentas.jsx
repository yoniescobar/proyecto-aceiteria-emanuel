import BuscadorPorCodigo from "../Articulo/BuscadorPorCodigo";
import { CarritoCompra } from "./CarritoCompra";
import { useState } from 'react';

const TblVentas = () => {

  const [articulo, setArticulo] = useState({});
  const [item, setItem] = useState(0);
  const [dat, setDat] = useState("");
 

  const handleAdd = data => {
    setArticulo(data);
  };

 

  return (
    <div className="container">
      <BuscadorPorCodigo />
    </div>
  )
}

export default TblVentas