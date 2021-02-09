const express = require('express');

//modulo local
const { login, signin, logout } = require('../controller/login_controller');
const { validateSingup } = require('../validator/vlogin');


const router = express.Router();

router.post('/login', login);

router.post('/signin', validateSingup, signin); // crearse una cuenta

router.get('/logout', logout);

module.exports = router;