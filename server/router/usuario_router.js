const express = require('express');


const usuarioController = require('../controller/usuario_controller');
const { isAuth, isAdmin } = require('../middleware/auth');

const router = express.Router();

//param usuario
router.param('usuarioID', usuarioController.usuarioById);



router.post('/usuario', [isAuth, isAdmin], usuarioController.registrar);
router.post('/usuario/listarautos', [isAuth], usuarioController.listarAutosUsuario);
router.put('/usuario/:usuarioID', [isAuth], usuarioController.update);
router.delete('/usuario/:usuarioID', [isAuth, isAdmin], usuarioController.borrar);

module.exports = router;