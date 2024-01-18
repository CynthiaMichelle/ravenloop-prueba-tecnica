import * as CryptoJS from "crypto-js";

export function formatearNumero(numero: string | undefined): string {
  if (numero) {
    const numeroEntero = parseInt(numero, 10);

    if (!isNaN(numeroEntero)) {
      return numeroEntero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return numero;
    }
  } else {
    return "No hay datos de visitas";
  }
}

export const calculateViewsPerVideo = (numViews: string, numVideos: string) => {
  return formatearNumero(
    Math.round(parseInt(numViews) / parseInt(numVideos)).toString()
  );
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
