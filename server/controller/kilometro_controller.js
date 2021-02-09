const ModelAuto = require('../models/model_auto');
const ModelKilometro = require('../models/model_kilometro');

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

//param kilometraje
const kilometrajeById = (req, res, next, id) => {

    ModelKilometro.findById(id)
        .exec((err, item) => {

            if (err || !item) return errorHandler(err, next, item);

            req.docKilometro = item;
            next();

        });

}


const getKilometro = (req, res) => {

    res.json({
        result: true,
        data: req.docKilometro
    })

}


const registrar = async(req, res, next) => {


    /* console.log(req.body); */

    let data = {
            cantidad: req.body.cantidad,
            codigoQr: req.body.codigoQr
        }
        /* console.log(req.files); */

    let modelKilometro = new ModelKilometro(data);

    modelKilometro.imagen.data = req.files.imagen.data;
    modelKilometro.imagen.contentType = req.files.imagen.mimetype;

    if (req.files) {

        if (req.files.imagen.size > 1000000) {
            let err = new Error('supero el tamaño maximo permitido');
            err.statusCode = 413;
            return next(err);
        }
    }

    modelKilometro.save()
        .then(async() => {

            auto = await ModelAuto.findOne({ codigoQr: data.codigoQr }).exec();

            let respuesta = await auto.addKilometraje(modelKilometro);

            //let newKilometrajeItems = [...this.kilometrajes.items];

            console.log(respuesta)
            res.json({
                result: true,
                data: respuesta
            })
        })
        .catch(err => {
            res.json({
                result: false,
                respuesta: err
            })

        });
}


const imagen = (req, res) => {

    console.log('req.docKilometro.imagen', req.docKilometro.imagen);

    res.set("Content-Type", req.docKilometro.imagen.contentType);
    res.set("xxxxx", "xxx");

    return res.send(req.docKilometro.imagen.data);

}



module.exports = {
    registrar,
    imagen,
    kilometrajeById,
    getKilometro
};