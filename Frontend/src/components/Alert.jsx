import Swal from 'sweetalert2'

export const AlertSuccess = (message) => {
    return Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: message,
        confirmButtonText: "OK",
    })
}

export const AlertError = (message) => {
    return Swal.fire({
        icon: "error",
        title: "Gagal",
        text: message,
        confirmButtonText: "OK",
    })
}

export const AlertWarning = (message) => {
    return Swal.fire({
        icon: "warning",
        title: "Peringatan",
        text: message,
        confirmButtonText: "OK",
    })
}

export const AlertConfirm = (message) => {
    return Swal.fire({
        icon: "question",
        title: "Konfirmasi",
        text: message,
        confirmButtonText: "Ya",
        showCancelButton: true,
        cancelButtonText: "Batal"
    })
}