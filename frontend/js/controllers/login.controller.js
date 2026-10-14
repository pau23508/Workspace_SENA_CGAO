import { loginUsuario } from '../services/usuario.service.js';
import { guardarUsuarioActivo } from '../utils/session.js';

const loginForm = document.getElementById('loginForm');

loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const correo = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const usuario = await loginUsuario(correo, password);
    guardarUsuarioActivo(usuario);
    window.location.href = 'user-page.html';
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById('btnIrRegistro')?.addEventListener('click', () => {
  window.location.href = 'form-registro.html';
});
