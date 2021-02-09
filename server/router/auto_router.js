const express = require('express');

const autoController = require('../controller/auto_controller');
const { isAuth, isAdmin } = require('../middleware/auth');

const router = express.Router();
//param
router.param('autoID', autoController.autoById);

router.get('/auto/:autoID', [isAuth], autoController.getAuto);
router.post('/auto', [isAuth, isAdmin], autoController.registrar);
router.put('/auto/:autoID', [isAuth, isAdmin], autoController.update);
router.delete('/auto/:autoID', [isAuth, isAdmin], autoController.borrar);

module.exports = router;