import usuarioModel from '../models/Usuario.model.js';

async function listar(req, res) {
  try {
    const usuarios = await usuarioModel.obtenerTodos();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
  }
}

async function obtener(req, res) {
  try {
    const usuario = await usuarioModel.obtenerPorId(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ mensaje: 'Error al obtener el usuario' });
  }
}

async function login(req, res) {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios' });
    }
    const usuario = await usuarioModel.obtenerPorCorreoConPassword(correo);
    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }
    const { password: _passwordOculto, ...usuarioSinPassword } = usuario;
    res.json(usuarioSinPassword);
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
}

async function crear(req, res) {
  try {
    const { nombre, apellido, correo, documento, telefono, password, rol } = req.body;

    if (!nombre || !apellido || !correo || !documento || !password) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
    }
    const nuevoUsuario = await usuarioModel.crear({
      nombre, apellido, correo, documento, telefono, password, rol
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ mensaje: 'El correo o documento ya está registrado' });
    }
    res.status(500).json({ mensaje: 'Error al crear el usuario' });
  }
}

async function actualizar(req, res) {
  try {
    const existente = await usuarioModel.obtenerPorId(req.params.id);
    if (!existente) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    const usuarioActualizado = await usuarioModel.actualizar(req.params.id, req.body);
    res.json(usuarioActualizado);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
  }
}

async function eliminar(req, res) {
  try {
    const eliminado = await usuarioModel.eliminar(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
  }
}

export default {
  listar,
  obtener,
  login,
  crear,
  actualizar,
  eliminar
};