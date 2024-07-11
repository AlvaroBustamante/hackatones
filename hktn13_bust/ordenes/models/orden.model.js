const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const ordenSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    curso_id: {
        type: Schema.Types.ObjectId,
        ref: 'Cursos',
        required: true
    },
    precio_unitario: Number,
    fecha_orden: {
        type: Date,
        default: Date.now
    },
    estado_pago: {
        type: String,
        enum: ['pendiente', 'completado', 'fallido'],
        default: 'pendiente'
    },
    cupon_id: {
        type: Schema.Types.ObjectId,
        ref: 'Cupones'
    },
    total_final: {
        type: Number,
        required: true
    },
});


ordenSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ordenSchema.set('toJSON', {
    virtuals: true
});

ordenSchema.findById = function (cb) {
    return this.model('Orden').find({id: this.id}, cb);
};

const Orden = mongoose.model('Ordenes', ordenSchema);

exports.findById = (id) => {
    return Orden.findById(id)
        .then((result) => {
            if(result){
                result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
            }else {
                return null;
            };
        })
};

exports.createOrden = (ordenData) => {
    const orden = new Orden(ordenData);
    return orden.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Orden.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, ordenes) {
                if (err) {
                    reject(err);
                } else {
                    resolve(ordenes);
                }
            })
    });
};

exports.patchOrden = (id, ordenData) => {
    return Orden.findOneAndUpdate({
        _id: id
    }, ordenData);
};

exports.pagarOrden = (ordenId) => {
    return Orden.findOneAndUpdate(
        {_id: ordenId},
        { $set: { estado_pago: 'completado' } },);
};

exports.removeById = (ordenId) => {
    return new Promise((resolve, reject) => {
        Orden.deleteMany({_id: ordenId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

