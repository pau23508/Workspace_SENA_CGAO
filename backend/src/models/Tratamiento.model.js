import pool from '../config/db.js';

const obtenerTodos = async () => {
  const [tratamientos] = await pool.query(`
    SELECT
      id,
      nombre,
      descripcion,
      precio,
      duracion_minutos
    FROM tratamientos
    WHERE estado = 'ACTIVO'
    ORDER BY nombre ASC
  `);
  return tratamientos;
};

export default {
  obtenerTodos
};