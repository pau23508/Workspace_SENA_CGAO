import { Router } from 'express';
import usuarioController from '../controller/usuario.controller.js';
import citaController from '../controller/cita.controller.js';
import doctorController from '../controller/doctor.controller.js';
import tratamientoController from '../controller/tratamiento.controller.js';

const router = Router();

// ----- Rutas de usuarios -----
router.get('/usuarios', usuarioController.listar);
router.get('/usuarios/:id', usuarioController.obtener);
router.post('/usuarios/login', usuarioController.login);
router.post('/usuarios', usuarioController.crear);
router.put('/usuarios/:id', usuarioController.actualizar);
router.delete('/usuarios/:id', usuarioController.eliminar);

// ----- Rutas de doctores -----
router.get('/doctores', doctorController.listar);

// ----- Rutas de tratamientos -----
router.get('/tratamientos', tratamientoController.listar);

// ----- Rutas de citas -----
router.get('/citas', citaController.listar);
router.get('/citas/:id', citaController.obtener);
router.post('/citas', citaController.crear);
router.put('/citas/:id', citaController.actualizar);
router.delete('/citas/:id', citaController.eliminar);

export default router;
 