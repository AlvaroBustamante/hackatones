const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nombre: String,
    descripcion: String,
    img: String,
    portada: String,
    valor: Number
});


userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {
    return this.model('Cursos').find({id: this.id}, cb);
};

const Curso = mongoose.model('Cursos', userSchema);


exports.findByNombre = (nombre) => {
    return Curso.find({nombre: nombre});
};
exports.findById = (id) => {
    return Curso.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createCurso = (cursoData) => {
    const curso = new Curso(cursoData);
    return curso.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Curso.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchCurso = (id, cursoData) => {
    return Curso.findOneAndUpdate({
        _id: id
    }, cursoData);
};

exports.removeById = (cursoId) => {
    return new Promise((resolve, reject) => {
        Curso.deleteMany({_id: cursoId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

