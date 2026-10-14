import doctorModel from '../models/Doctor.model.js';

async function listar(req, res) {
  try {
    const doctores = await doctorModel.obtenerTodos();
    res.json(doctores);
  } catch (error) {
    console.error('Error al listar doctores:', error);
    res.status(500).json({
      mensaje: 'Error al obtener los doctores'
    });
  }
}

export default {
  listar
};