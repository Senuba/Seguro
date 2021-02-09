const ModelUsuario = require('../models/model_usuario');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


function errorHandler(err, next, item) {
    if (err) {

        return next(err);
    }
    if (!item) {
        const error = new Error('usuario o (password) incorrecto');
        error.statusCode = 500;
        return next(error);
    }


}
//==========
//	Login
//==========
const login = (req, res, next) => {

    let email = req.body.email;
    let password = req.body.password;


    ModelUsuario.findOne({ email: email }, (err, item) => {
        if (err || !item)
            return errorHandler(err, next, item)

        if (!bcrypt.compareSync(password, item.password)) {
            return res.status(401).json({
                result: true,
                message: 'usuario o (password) incorrecto'
            });
        }

        let payload = {
            usuarioId: item._id,
            role: item.role
        }

        let token = jwt.sign(
            payload,
            process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }
        );

        let user = item.toObject();
        delete user.password;

        res.json({
            result: true,
            data: {
                usuarioId: item._id,
                role: item.role,
                token: token
            }
        });

    })


}


//==========
// crear usuario
//==========

const signin = (req, res, next) => {

    let salt = parseInt(process.env.SALTH);

    let data = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        role: req.body.role
    }

    let modelUsuario = new ModelUsuario(data);

    modelUsuario.save((err, item) => {

        if (err || !item) return errorHandler(err, next, item);


        res.json({
            result: true,
            data: {
                usuarioId: item._id,
                role: item.role,

            }
        })

    });
}

const logout = (req, res) => {
    if (req.session) {
        req.session.destroy(item => {
            res.json({
                result: true
            })
        })
    }
}

module.exports = {
    signin,
    login,
    logout
};