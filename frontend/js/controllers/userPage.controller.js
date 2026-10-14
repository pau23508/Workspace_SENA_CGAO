import { obtenerUsuarioActivo, cerrarSesion } from '../utils/session.js';

import {
  obtenerCitas,
  obtenerCitaPorId,
  actualizarCita,
  obtenerDoctores,
  obtenerTratamientos,
  crearCita
} from '../services/cita.service.js';

const usuarioActivo = obtenerUsuarioActivo();

if (!usuarioActivo) {
  window.location.href = './home.html';
}

const spanUser = document.getElementById('user');

if (spanUser && usuarioActivo) {
  spanUser.textContent = usuarioActivo.nombre;
}

const btnCerrarSesion = document.getElementById('btnCerrarSesion');
  btnCerrarSesion?.addEventListener('click', () => {
  cerrarSesion();
  window.location.replace('./home.html');
});

const modalNuevaCita = document.getElementById('modal-nueva-cita');
const btnNuevaCita = document.getElementById('btn-nueva-cita');
const btnCerrarModal = document.getElementById('btn-cerrar-modal');
const btnCancelarModal = document.getElementById('btn-cancelar-modal');

btnNuevaCita?.addEventListener('click', () => {
  modalNuevaCita.classList.add('activo');
});

btnCerrarModal?.addEventListener('click', () => {
  modalNuevaCita.classList.remove('activo');
});

btnCancelarModal?.addEventListener('click', () => {
  modalNuevaCita.classList.remove('activo');
});

async function cargarDoctores() {
  try {
    const doctores = await obtenerDoctores();
    const selectDoctor = document.getElementById('doctor');
    if (!selectDoctor) return;
    doctores.forEach(doctor => {
      const opcion = document.createElement('option');
      opcion.value = doctor.id;
      opcion.textContent =
        `${doctor.nombre} ${doctor.apellido} - ${doctor.especialidad}`;
      selectDoctor.appendChild(opcion);
    });
  } catch (error) {
    console.error(
      'Error al cargar los doctores:',
      error
    );
  }
}

async function cargarTratamientos() {
  try {
    const tratamientos = await obtenerTratamientos();
    const selectTratamiento =
      document.getElementById('tratamiento');
    if (!selectTratamiento) return;
    tratamientos.forEach(tratamiento => {
      const opcion = document.createElement('option');
      opcion.value = tratamiento.id;
      opcion.textContent =
        `${tratamiento.nombre} - $${Number(
          tratamiento.precio
        ).toLocaleString('es-CO')}`;
      selectTratamiento.appendChild(opcion);
    });
  } catch (error) {
    console.error(
      'Error al cargar los tratamientos:',
      error
    );
  }
}

const formNuevaCita =
  document.getElementById('form-nueva-cita');

formNuevaCita?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const tratamiento_id =
    document.getElementById('tratamiento').value;
  const doctor_id =
    document.getElementById('doctor').value;
  const fecha =
    document.getElementById('fecha').value;
  const hora =
    document.getElementById('hora').value;
  const observaciones =
    document
      .getElementById('observaciones')
      .value
      .trim();
  try {
    await crearCita({
      usuario_id: usuarioActivo.id,
      tratamiento_id,
      doctor_id,
      fecha,
      hora,
      estado: 'PENDIENTE',
      observaciones
    });
    alert('Cita agendada correctamente');
    formNuevaCita.reset();
    modalNuevaCita.classList.remove('activo');
    cargarCitas();
  } catch (error) {
    console.error(
      'Error al agendar la cita:',
      error
    );
    alert('No fue posible agendar la cita');
  }
});

async function cargarCitas() {
  try {
    const citas = await obtenerCitas();
    console.log('Citas obtenidas:', citas);
    const misCitas = citas.filter(
      cita =>
        Number(cita.usuario_id) ===
        Number(usuarioActivo.id)
    );
    console.log('Mis citas:', misCitas);
    mostrarCitas(misCitas);
  } catch (error) {
    console.error(
      'Error al cargar las citas:',
      error
    );
  }
}

function mostrarCitas(citas) {
  const tbody =
    document.getElementById('citas-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (citas.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6">
          No tienes citas registradas.
        </td>
      </tr>
    `;
    return;
  }

  citas.forEach(cita => {
    const fila =
      document.createElement('tr');
    fila.innerHTML = `
      <td>
        ${formatearFecha(cita.fecha)}
      </td>
      <td>
        ${formatearHora(cita.hora)}
      </td>
      <td>
        ${cita.tratamiento_nombre}
      </td>
      <td>
        ${cita.doctor_nombre}
        <small>
          ${cita.doctor_especialidad}
        </small>
      </td>
      <td>
        <button class="btn-secundario">
          ${cita.estado}
        </button>
      </td>
      <td>
        ${crearBotonesAccion(cita)}
      </td>
    `;
    tbody.appendChild(fila);
  });
  activarEventosAcciones();
}

function formatearFecha(fecha) {
  const soloFecha =
    fecha.split('T')[0];
  const [anio, mes, dia] =
    soloFecha.split('-');
  return `${dia}.${mes}.${anio}`;
}

function formatearHora(hora) {
  const [horas, minutos] =
    hora.split(':');
  const h = Number(horas);
  const periodo =
    h >= 12 ? 'PM' : 'AM';
  const hora12 =
    h % 12 || 12;
  return `${hora12}:${minutos} ${periodo}`;
}

function crearBotonesAccion(cita) {
  switch (cita.estado) {
    case 'PENDIENTE':
      return `
        <div class="acciones-cita">
          <button
            class="btn-secundario btn-cancelar"
            data-id="${cita.id}"
          >
            Cancelar
          </button>
        </div>
      `;
    case 'CONFIRMADA':
      return `
        <div class="acciones-cita">
          <button
            class="btn-secundario btn-ver"
            data-id="${cita.id}"
          >
            Ver
          </button>
        </div>
      `;
    case 'FINALIZADA':
      return `
        <div class="acciones-cita">
          <button
            class="btn-secundario btn-ver"
            data-id="${cita.id}"
          >
            Ver
          </button>
        </div>
      `;
    case 'CANCELADA':
      return `
        <span>
          Sin acciones
        </span>
      `;
    default:
      return '';
  }
}

function activarEventosAcciones() {
  document
    .querySelectorAll('.btn-cancelar')
    .forEach(boton => {
      boton.addEventListener(
        'click',
        async () => {
          const id =
            boton.dataset.id;
          const confirmar =
            confirm(
              '¿Estás seguro de que deseas cancelar esta cita?'
            );
          if (!confirmar) return;
          try {
            const cita =
              await obtenerCitaPorId(id);
            await actualizarCita(
              id,
              {
                usuario_id:
                  cita.usuario_id,
                tratamiento_id:
                  cita.tratamiento_id,
                doctor_id:
                  cita.doctor_id,
                fecha:
                  cita.fecha.split('T')[0],
                hora:
                  cita.hora,
                estado:
                  'CANCELADA',
                observaciones:
                  cita.observaciones
              }
            );
            alert(
              'Cita cancelada correctamente'
            );
            cargarCitas();
          } catch (error) {
            console.error(
              'Error al cancelar la cita:',
              error
            );
            alert(
              'No fue posible cancelar la cita'
            );
          }
        }
      );
    });

  document
    .querySelectorAll('.btn-ver')
    .forEach(boton => {

      boton.addEventListener(
        'click',
        () => {

          const id =
            boton.dataset.id;


          console.log(
            'Ver cita:',
            id
          );

        }
      );

    });

}

if (usuarioActivo) {

  cargarCitas();

  cargarDoctores();

  cargarTratamientos();

}