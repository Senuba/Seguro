var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelKilometro = new Schema({
    cantidad: {
        type: Number,
        required: true
    },
    imagen: {
        data: Buffer,
        contentType: String
    },
    disponible: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true

});

const model = mongoose.model('ModelKilometro', modelKilometro);

module.exports = model;