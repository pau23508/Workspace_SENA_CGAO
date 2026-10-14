import pool from '../config/db.js';

const obtenerTodos = async () => {
  const [doctores] = await pool.query(`
    SELECT
      id,
      nombre,
      apellido,
      especialidad
    FROM doctores
    WHERE estado = 'ACTIVO'
    ORDER BY nombre ASC
  `);

  return doctores;
};

export default {
  obtenerTodos
};