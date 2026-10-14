const CLAVE_SESION = 'userActivo';

export function guardarUsuarioActivo(usuario) {
  localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
}

export function obtenerUsuarioActivo() {
  const data = localStorage.getItem(CLAVE_SESION);
  return data ? JSON.parse(data) : null;
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}
