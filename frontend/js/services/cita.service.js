const API_URL = 'http://localhost:3000/api/citas';

// Obtener todas las citas
async function obtenerCitas() {

  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error('Error al obtener las citas');
  }

  return await respuesta.json();
}

// Obtener una cita por ID
async function obtenerCitaPorId(id) {

  const respuesta = await fetch(`${API_URL}/${id}`);

  if (!respuesta.ok) {
    throw new Error('Error al obtener la cita');
  }

  return await respuesta.json();
}

// Crear una cita
async function crearCita(datos) {

  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  if (!respuesta.ok) {
    throw new Error('Error al crear la cita');
  }

  return await respuesta.json();
}

// Actualizar una cita
async function actualizarCita(id, datos) {

  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  if (!respuesta.ok) {
    throw new Error('Error al actualizar la cita');
  }

  return await respuesta.json();
}

// Eliminar una cita
async function eliminarCita(id) {

  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!respuesta.ok) {
    throw new Error('Error al eliminar la cita');
  }

  return await respuesta.json();
}


async function obtenerDoctores() {
  const respuesta = await fetch('http://localhost:3000/api/doctores');

  if (!respuesta.ok) {
    throw new Error('Error al obtener los doctores');
  }

  return await respuesta.json();
}


async function obtenerTratamientos() {
  const respuesta = await fetch('http://localhost:3000/api/tratamientos');

  if (!respuesta.ok) {
    throw new Error('Error al obtener los tratamientos');
  }

  return await respuesta.json();
}

export {
  obtenerCitas,
  obtenerCitaPorId,
  crearCita,
  actualizarCita,
  eliminarCita,
  obtenerDoctores,
  obtenerTratamientos
};