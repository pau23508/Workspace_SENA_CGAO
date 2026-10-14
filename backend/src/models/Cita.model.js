import pool from '../config/db.js';

const obtenerTodos = async () => {
  const [citas] = await pool.query(`
    SELECT
      citas.id,
      citas.usuario_id,
      citas.tratamiento_id,
      citas.doctor_id,
      citas.fecha,
      citas.hora,
      citas.estado,
      citas.observaciones,

      tratamientos.nombre AS tratamiento_nombre,

      CONCAT(doctores.nombre, ' ', doctores.apellido) AS doctor_nombre,
      doctores.especialidad AS doctor_especialidad

      FROM citas

      INNER JOIN tratamientos
      ON citas.tratamiento_id = tratamientos.id

      INNER JOIN doctores
      ON citas.doctor_id = doctores.id

      ORDER BY citas.fecha ASC, citas.hora ASC
  `);
  return citas;
};

const obtenerPorId = async (id) => {
  const [citas] = await pool.query(`
    SELECT
      citas.id,
      citas.usuario_id,
      citas.tratamiento_id,
      citas.doctor_id,
      citas.fecha,
      citas.hora,
      citas.estado,
      citas.observaciones,

      tratamientos.nombre AS tratamiento_nombre,

      CONCAT(doctores.nombre, ' ', doctores.apellido) AS doctor_nombre,
      doctores.especialidad AS doctor_especialidad

      FROM citas

      INNER JOIN tratamientos
      ON citas.tratamiento_id = tratamientos.id

      INNER JOIN doctores
      ON citas.doctor_id = doctores.id

      WHERE citas.id = ?
  `, [id]);
  return citas[0];
};

const crear = async (
  usuario_id,
  tratamiento_id,
  doctor_id,
  fecha,
  hora,
  estado,
  observaciones
) => {
  const [resultado] = await pool.query(`
    INSERT INTO citas
    (
      usuario_id,
      tratamiento_id,
      doctor_id,
      fecha,
      hora,
      estado,
      observaciones
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [
    usuario_id,
    tratamiento_id,
    doctor_id,
    fecha,
    hora,
    estado,
    observaciones
  ]);
  return resultado.insertId;
};

const actualizar = async (
  id,
  usuario_id,
  tratamiento_id,
  doctor_id,
  fecha,
  hora,
  estado,
  observaciones
) => {
  const [resultado] = await pool.query(`
    UPDATE citas
    SET
      usuario_id = ?,
      tratamiento_id = ?,
      doctor_id = ?,
      fecha = ?,
      hora = ?,
      estado = ?,
      observaciones = ?
    WHERE id = ?
  `, [
    usuario_id,
    tratamiento_id,
    doctor_id,
    fecha,
    hora,
    estado,
    observaciones,
    id
  ]);
  return resultado.affectedRows;
};


const eliminar = async (id) => {
  const [resultado] = await pool.query(
    'DELETE FROM citas WHERE id = ?',
    [id]
  );
  return resultado.affectedRows;
};

export default {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};


























/* import pool from '../config/db.js';

// Trae todas las citas
async function obtenerTodos() {

  const [rows] = await pool.query(`
    SELECT
      c.id,
      c.usuario_id,
      c.tratamiento_id,
      c.fecha,
      c.hora,
      c.estado,
      c.observaciones
    FROM citas c
    ORDER BY c.id DESC
  `);

  return rows;
}

// Trae una cita por ID
async function obtenerPorId(id) {

  const [rows] = await pool.query(`
    SELECT
      c.id,
      c.usuario_id,
      c.tratamiento_id,
      c.fecha,
      c.hora,
      c.estado,
      c.observaciones
    FROM citas c
    WHERE c.id = ?
  `, [id]);

  return rows[0];
}

// Crea una nueva cita
async function crear({
  usuario_id,
  tratamiento_id,
  fecha,
  hora,
  estado,
  observaciones
}) {

  const [result] = await pool.query(`
    INSERT INTO citas (
      usuario_id,
      tratamiento_id,
      fecha,
      hora,
      estado,
      observaciones
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `, [
    usuario_id,
    tratamiento_id,
    fecha,
    hora,
    estado || 'PENDIENTE',
    observaciones || null
  ]);

  return obtenerPorId(result.insertId);
}

// Actualiza una cita existente
async function actualizar(
  id,
  {
    usuario_id,
    tratamiento_id,
    fecha,
    hora,
    estado,
    observaciones
  }
) {

  await pool.query(`
    UPDATE citas
    SET
      usuario_id = ?,
      tratamiento_id = ?,
      fecha = ?,
      hora = ?,
      estado = ?,
      observaciones = ?
    WHERE id = ?
  `, [
    usuario_id,
    tratamiento_id,
    fecha,
    hora,
    estado,
    observaciones || null,
    id
  ]);

  return obtenerPorId(id);
}

// Elimina una cita
async function eliminar(id) {

  const [result] = await pool.query(
    `DELETE FROM citas WHERE id = ?`,
    [id]
  );

  return result.affectedRows > 0;
}

export default {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
}; */