const express = require('express');


const kilometroController = require('../controller/kilometro_controller');

const { isAuth, isAdmin } = require('../middleware/auth');

const router = express.Router();


//param
router.param('kilometroID', kilometroController.kilometrajeById);


router.post('/kilometro', [isAuth], kilometroController.registrar);
router.get('/kilometro/:kilometroID', [isAuth], kilometroController.getKilometro);
router.get('/kilometro/imagen/:kilometroID', [isAuth], kilometroController.imagen);



module.exports = router;