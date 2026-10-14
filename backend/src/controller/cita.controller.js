import citaModel from '../models/Cita.model.js';

async function listar(req, res) {
  try {
    const citas = await citaModel.obtenerTodos();
    res.json(citas);
  } catch (error) {
    console.error('Error al listar citas:', error);
    res.status(500).json({
      mensaje: 'Error al obtener las citas'
    });
  }
}

async function obtener(req, res) {
  try {
    const cita = await citaModel.obtenerPorId(
      req.params.id
    );
    if (!cita) {
      return res.status(404).json({
        mensaje: 'Cita no encontrada'
      });
    }
    res.json(cita);
  } catch (error) {
    console.error('Error al obtener cita:', error);
    res.status(500).json({
      mensaje: 'Error al obtener la cita'
    });
  }
}

async function crear(req, res) {
  try {
    const {
      usuario_id,
      tratamiento_id,
      doctor_id,
      fecha,
      hora,
      estado,
      observaciones
    } = req.body;
    // Campos obligatorios
    if (
      !usuario_id ||
      !tratamiento_id ||
      !doctor_id ||
      !fecha ||
      !hora
    ) {
      return res.status(400).json({
        mensaje: 'Usuario, tratamiento, doctor, fecha y hora son obligatorios'
      });
    }
    const nuevaCita = await citaModel.crear(
      usuario_id,
      tratamiento_id,
      doctor_id,
      fecha,
      hora,
      estado,
      observaciones
    );
    res.status(201).json(nuevaCita);
  } catch (error) {
    console.error('Error al crear cita:', error);
    // Error por FK inexistente
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        mensaje: 'El usuario, tratamiento o doctor indicado no existe'
      });
    }
    res.status(500).json({
      mensaje: 'Error al crear la cita'
    });
  }
}

async function actualizar(req, res) {
  try {
    const existente = await citaModel.obtenerPorId(
      req.params.id
    );
    if (!existente) {
      return res.status(404).json({
        mensaje: 'Cita no encontrada'
      });
    }
    const {
      usuario_id,
      tratamiento_id,
      doctor_id,
      fecha,
      hora,
      estado,
      observaciones
    } = req.body;
    if (
      !usuario_id ||
      !tratamiento_id ||
      !doctor_id ||
      !fecha ||
      !hora
    ) {
      return res.status(400).json({
        mensaje: 'Usuario, tratamiento, doctor, fecha y hora son obligatorios'
      });
    }
    const citaActualizada = await citaModel.actualizar(
      req.params.id,
      usuario_id,
      tratamiento_id,
      doctor_id,
      fecha,
      hora,
      estado,
      observaciones
    );
    res.json(citaActualizada);
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        mensaje: 'El usuario, tratamiento o doctor indicado no existe'
      });
    }
    res.status(500).json({
      mensaje: 'Error al actualizar la cita'
    });
  }
}


async function eliminar(req, res) {
  try {
    const eliminado = await citaModel.eliminar(
      req.params.id
    );
    if (!eliminado) {
      return res.status(404).json({
        mensaje: 'Cita no encontrada'
      });
    }
    res.json({
      mensaje: 'Cita eliminada correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    res.status(500).json({
      mensaje: 'Error al eliminar la cita'
    });
  }
}

export default {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar
};