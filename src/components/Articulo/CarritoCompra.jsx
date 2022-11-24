
export const CarritoCompra = (data) => {
    const item = data.handleAdd;
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
                <div className="col-lg-6">Total</div>
                <div className="col-lg-6">Q. 00.00</div>
            </div>
        </>
    )
}
