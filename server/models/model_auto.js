var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelAuto = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'ModelUsuario'
    },
    marca: {
        type: String,
        required: true
    },
    año: {
        type: String,
        required: true
    },
    codigoQr: {
        type: String,
        required: true,
        unique: true
    },
    kilometrajes: {
        items: [{
            kilometrajeId: {
                type: Schema.Types.ObjectId,
                ref: 'ModelKilometro'
            },
            total_pagar: {
                type: Number
            },
            kilometraje_cobrado: {
                type: Number
            },
            kilometraje_total: {
                type: Number
            }
        }]
    },
    total_kilometraje: {
        type: Number,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    patente: {
        type: String,
        required: true,
        unique: true
    },
    vin: {
        type: String,
        required: true
    },
    disponible: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true

});

modelAuto.methods.addKilometraje = async function(kilometraje) {
    let newKilometrajeItems = [...this.kilometrajes.items];


    let kilometro_usuario = kilometraje.cantidad;

    const precio = 500;

    let kilometraje_cobrar = kilometro_usuario - this.total_kilometraje;

    let total = kilometraje_cobrar * precio;

    newKilometrajeItems.push({
        kilometrajeId: kilometraje._id,
        total_kilometraje: this.total_kilometraje,
        total_pagar: total,
        kilometraje_cobrado: kilometraje_cobrar

    })

    let newKilometraje = {
        items: newKilometrajeItems
    }


    this.kilometrajes = newKilometraje;

    this.total_kilometraje = kilometro_usuario;

    /* let result = await this.save() */

    /* return { kilometraje_cobrar, total, result }; */
    return await this.save();
}

const model = mongoose.model('ModelAuto', modelAuto);

module.exports = model;