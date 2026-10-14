import { registrarUsuario } from '../services/usuario.service.js';

const formRegistro = document.getElementById('formRegistro');

formRegistro?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('name').value;
  const apellido = document.getElementById('apellido').value;
  const correo = document.getElementById('formEmail').value;
  const documento = document.getElementById('documento').value;
  const password = document.getElementById('formPassword').value;

  try {
    await registrarUsuario({ nombre, apellido, correo, documento, password });
    alert('Registro exitoso');
    formRegistro.reset();
    window.location.href = 'home.html';
  } catch (error) {
    alert(error.message);
  }
});
