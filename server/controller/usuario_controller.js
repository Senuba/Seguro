const ModelUsuario = require('../models/model_usuario');
const bcrypt = require('bcrypt')


function errorHandler(err, next, item) {
    if (err) {

        return next(err);
    }
    if (!item) {
        const error = new Error('No existe');
        error.statusCode = 500;
        return next(error);
    }


}

//buscar usuario por id
const usuarioById = (req, res, next, id) => {

    ModelUsuario.findById(id)
        .where({ disponible: true })
        .exec((err, item) => {
            if (err || !item) return errorHandler(err, next, item);

            req.docUsuario = item;
            next();
        });

}


//	get Usuario


const getUsuario = async(req, res) => {

    res.json({
        result: true,
        data: req.docUsuario
    })

}

const listarAutosUsuario = async(req, res, next) => {
    let id = req.body.userId;

    let usuario = await ModelUsuario.findById(id).where({ disponible: true }).exec(async(err, item) => {

        if (err || !item) return errorHandler(err, next, item);
        usuario = item;
        console.log(usuario);

        let docUsuarioPopulate = await usuario.populate('autos.items.autoId').execPopulate();

        res.json({
            result: true,
            data: docUsuarioPopulate

        })
        next();

    });


}

//registrar un usuario
const registrar = async(req, res, next) => {


    console.log(req.body);
    let salt = parseInt(process.env.SALTH);

    let data = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        role: req.body.role
    }



    let modelUsuario = new ModelUsuario(data);

    await modelUsuario.save((err, item) => {

        if (err || !item) return errorHandler(err, next, item);

        res.json({
            result: true,
            item: item
        })

    });
}


//update usuario

const update = async(req, res, next) => {

    let salt = parseInt(process.env.SALTH);

    let data = {
        nombre: req.body.nombre,
        password: bcrypt.hashSync(req.body.password, salt)
    }

    ModelUsuario.findByIdAndUpdate(
        req.docUsuario._id,
        data, { new: true },
        (err, item) => {
            if (err || !item) return errorHandler(err, next, item);

            res.json({
                result: true,
                data: item
            })
        })

}


const borrar = (req, res, next) => {


    req.docUsuario.disponible = false;
    req.docUsuario.save((err, item) => {
        if (err || !item) return errorHandler(err, next, items);

        res.json({
            result: true,
            data: item
        })

    })

}






module.exports = {
    getUsuario,
    usuarioById,
    registrar,
    listarAutosUsuario,
    update,
    borrar
};