import BuscadorPorCodigo from "../components/Articulo/BuscadorPorCodigo";
import { CarritoCompra } from "../components/Articulo/CarritoCompra";
import { useState } from 'react';

export default function AddVenta() {
  const [articulo, setArticulo] = useState({});

  const handleAdd = data => {
    setArticulo(data);
  };
  return (
    <>
    <div className="container">
      <BuscadorPorCodigo handleAdd={handleAdd} />
      <hr />
      <CarritoCompra handleAdd={articulo}/>
    </div>
    </>
  )
}
