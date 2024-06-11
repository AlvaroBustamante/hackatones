const db = require("../models");
const VacunaMascota = db.vacunaMascota;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.activo) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const vacunaMascota = {
        idMascota: req.body.idMascota,
        idVacuna: req.body.idVacuna,
        activo: req.body.activo,
        usuarioCreacion: req.body.usuarioCreacion,
        fechaCreacion: req.body.fechaCreacion,
        usuarioModificacion: req.body.usuarioModificacion,
        fechaModificacion: req.body.fechaModificacion
    };
    VacunaMascota.create(vacunaMascota).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Vacuna mascota."
            });
        });
};