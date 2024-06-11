const db = require("../models");
const Especie = db.especie;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.descripcion) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const especie = {
        descripcion: req.body.descripcion,
        activo: req.body.activo,
        usuarioCreacion: req.body.usuarioCreacion,
        fechaCreacion: req.body.fechaCreacion,
        usuarioModificacion: req.body.usuarioModificacion,
        fechaModificacion: req.body.fechaModificacion
    };
    Especie.create(especie).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the especie."
            });
        });
};