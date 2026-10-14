import pool from '../config/db.js';

async function obtenerTodos() {
  const [rows] = await pool.query(
    `SELECT id, nombre, apellido, correo, documento, telefono, rol, fecha_registro
     FROM usuarios
     ORDER BY id DESC`
  );

  return rows;
}

async function obtenerPorId(id) {
  const [rows] = await pool.query(
    `SELECT id, nombre, apellido, correo, documento, telefono, rol, fecha_registro
     FROM usuarios
     WHERE id = ?`,
    [id]
  );

  return rows[0];
}

async function obtenerPorCorreoConPassword(correo) {
  const [rows] = await pool.query(
    `SELECT id, nombre, apellido, correo, documento, telefono, rol, fecha_registro, password
     FROM usuarios
     WHERE correo = ?`,
    [correo]
  );

  return rows[0];
}

async function crear({
  nombre,
  apellido,
  correo,
  documento,
  telefono,
  password,
  rol
}) {
  const [result] = await pool.query(
    `INSERT INTO usuarios (nombre, apellido, correo, documento, telefono, password, rol)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, apellido, correo, documento, telefono, password, rol || 'USER']
  );

  return obtenerPorId(result.insertId);
}

async function actualizar(
  id,
  { nombre, apellido, correo, documento, telefono, rol }
) {
  await pool.query(
    `UPDATE usuarios
     SET nombre = ?, apellido = ?, correo = ?, documento = ?, telefono = ?, rol = ?
     WHERE id = ?`,
    [nombre, apellido, correo, documento, telefono, rol, id]
  );

  return obtenerPorId(id);
}

async function eliminar(id) {
  const [result] = await pool.query(
    `DELETE FROM usuarios WHERE id = ?`,
    [id]
  );

  return result.affectedRows > 0;
}

export default {
  obtenerTodos,
  obtenerPorId,
  obtenerPorCorreoConPassword,
  crear,
  actualizar,
  eliminar
};