export default function numeroAQuetzales (numero) {
    const f = new Intl.NumberFormat("es-GT", {
        currency: "GTQ",
        style: "currency",
    })
    return f.format(numero)
}