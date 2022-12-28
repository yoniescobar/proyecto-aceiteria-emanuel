export default function numeroAQuetzales (numero) {
    const f = new Intl.NumberFormat("es-GT", {
        currency: "GTQ",
        style: "currency",
    })
    return f.format(numero)
}

export function dateToGTFormat(date){
    return new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}).format(date)
}