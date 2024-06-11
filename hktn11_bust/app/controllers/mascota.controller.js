const db = require("../models");
const Mascota = db.mascotas;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const mascota = {
        nombre: req.body.nombre,
        fechaNacimiento: req.body.fechaNacimiento,
        idEspecie: req.body.idEspecie,
        idRaza: req.body.idRaza,
        idColor: req.body.idColor,
        idPropietario: req.body.idPropietario,
        activo: req.body.activo,
        usuarioCreacion: req.body.usuarioCreacion,
        fechaCreacion: req.body.fechaCreacion,
        usuarioModificacion: req.body.usuarioModificacion,
        fechaModificacion: req.body.fechaModificacion
    };
    Mascota.create(mascota).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Mascota."
            });
        });
};