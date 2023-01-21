import { useEffect, useState } from "react";

export const CarritoCompra = (props) => {
    const [products, setProducts] = useState([]);
    return (
        <>
            <div className="row">
                <p className="lead"> <b>Pedido</b> </p>
                <table className="table table-striped">
                    <thead>
                        <th>Cantidad</th>
                        <th>Descripcion</th>
                        <th>Precio unitario</th>
                        <th>Precio total</th>
                    </thead>
                </table>
            </div>
        </>
    )
}
