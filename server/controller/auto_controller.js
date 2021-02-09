const modelUsuario = require('../models/model_usuario');
const ModelAuto = require('../models/model_auto');

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

//para el param
const autoById = (req, res, next, id) => {

    ModelAuto.findById(id)
        .exec((err, item) => {

            if (err || !item) return errorHandler(err, next, item);

            req.docAuto = item;
            next();

        });

}


//traer auto por id
const getAuto = (req, res) => {

    res.json({
        result: true,
        data: req.docAuto
    })

}


const registrar = async(req, res, next) => {


    console.log(req.body);

    let data = {
        userId: req.body.userId,
        marca: req.body.marca,
        año: req.body.año,
        codigoQr: req.body.codigoQr,
        total_kilometraje: req.body.total_kilometraje,
        modelo: req.body.modelo,
        patente: req.body.patente,
        vin: req.body.vin
    }


    auto = new ModelAuto(data);

    auto.save().then(async() => {

            usuario = await modelUsuario.findById(data.userId).exec();
            let respuesta = await usuario.addAuto(auto._id);

            res.json({
                result: true,
                usuario: respuesta
            })
        })
        .catch(err => {
            res.status(500).json({
                result: false,
                respuesta: err
            })

        });
}



//actualizar auto
const update = async(req, res, next) => {

    ModelAuto.findByIdAndUpdate(
        req.docAuto._id,
        req.body, { new: true },
        (err, item) => {
            if (err || !item) return errorHandler(err, next, item);

            res.json({
                result: true,
                data: item
            })
        })

}

//borrar auto
const borrar = async(req, res, next) => {

    console.log(req.docAuto);

    req.docAuto.disponible = false;
    req.docAuto.save((err, item) => {
        if (err || !item) return errorHandler(err, next, items);

        res.json({
            result: true,
            data: item
        })

    })

}





module.exports = {
    registrar,
    update,
    autoById,
    getAuto,
    borrar
};