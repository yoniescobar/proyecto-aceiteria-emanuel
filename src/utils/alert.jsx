import Swal from 'sweetalert2'

export const alertMensaje = (mensaje, clase) => {
    Swal.fire(
      mensaje,
      '',
      clase
    )
  }

