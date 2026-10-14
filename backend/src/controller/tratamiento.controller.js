import tratamientoModel from '../models/tratamiento.model.js';

async function listar(req, res) {
  try {
    const tratamientos = await tratamientoModel.obtenerTodos();
    res.json(tratamientos);
  } catch (error) {
    console.error('Error al listar tratamientos:', error);
    res.status(500).json({
      mensaje: 'Error al obtener los tratamientos'
    });
  }
}

export default {
  listar
};