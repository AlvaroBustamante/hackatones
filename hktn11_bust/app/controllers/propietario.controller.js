const db = require("../models");
const Propietario = db.propietario;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const propietario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        documento: req.body.documento,
        idTipoDocumento: req.body.idTipoDocumento,
        idNacionalidad: req.body.idNacionalidad,
        ubigeo: req.body.ubigeo,
        activo: req.body.activo,
        usuarioCreacion: req.body.usuarioCreacion,
        fechaCreacion: req.body.fechaCreacion,
        usuarioModificacion: req.body.usuarioModificacion,
        fechaModificacion: req.body.fechaModificacion
    };
    Propietario.create(propietario).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the propietario."
            });
        });
};