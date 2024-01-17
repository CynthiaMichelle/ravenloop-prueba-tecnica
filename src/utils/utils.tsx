import * as CryptoJS from "crypto-js";

export function formatearNumero(numero: string | undefined): string {
    if (numero) {
        // Convierte la cadena a un número entero
        const numeroEntero = parseInt(numero, 10);
      
        // Verifica si el número es un entero válido
        if (!isNaN(numeroEntero)) {
          // Formatea el número con puntos
          return numeroEntero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } else {
          // En caso de que la entrada no sea un número válido, retorna la cadena original
          return numero;
        }
    }
    else {
        return 'No hay datos de visitas'
    }
}

export const calculateViewsPerVideo = (numViews: string, numVideos: string) => {
  return formatearNumero(Math.round(parseInt(numViews) / parseInt(numVideos)).toString());
};

export function calcularHashMD5(texto: string): string {
  const hash = CryptoJS.MD5(texto);
  return hash.toString(CryptoJS.enc.Hex);
}

export function formatearFecha(timestamp: string): string {
  const fecha = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const fechaFormateada = fecha
    .toLocaleDateString("en-US", options)
    .replace(/\//g, "-");
  return fechaFormateada;
}
