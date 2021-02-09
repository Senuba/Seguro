var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelUsuario = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    disponible: {
        type: Boolean,
        default: true
    },
    autos: {
        items: [{
            autoId: {
                type: Schema.Types.ObjectId,
                ref: 'ModelAuto'
            }
        }]
    }

}, {
    timestamps: true

});


modelUsuario.methods.addAuto = async function(auto) {

    let newAutoItems = [...this.autos.items]

    /* let docAutoPopulate = await this
        .populate('autos.items.autoId').execPopulate(); */


    /* let auto = docAutoPopulate.autos.items.map(item => {
        if (item.patente === auto.patente) {
            res.json({
                ok: false,
                data: item,
                msg: "ya existe un auto con esta patente registrado"
            });
        }



    }) */

    newAutoItems.push({
        autoId: auto
    })


    let newAuto = {
        items: newAutoItems
    }

    this.autos = newAuto;

    return await this.save();

}

const model = mongoose.model('ModelUsuario', modelUsuario);

module.exports = model;