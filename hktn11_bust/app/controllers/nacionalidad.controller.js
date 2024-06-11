const db = require("../models");
const Nacionalidad = db.nacionalidad;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.descripcion) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const nacionalidad = {
        descripcion: req.body.descripcion,
        activo: req.body.activo,
        usuarioCreacion: req.body.usuarioCreacion,
        fechaCreacion: req.body.fechaCreacion,
        usuarioModificacion: req.body.usuarioModificacion,
        fechaModificacion: req.body.fechaModificacion
    };
    Nacionalidad.create(nacionalidad).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the nacionality."
            });
        });
};