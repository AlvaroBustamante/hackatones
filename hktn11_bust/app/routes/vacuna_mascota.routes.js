
module.exports = app => {
    const vacuna_mascota = require("../controllers/vacuna_mascota.controller.js");
    var router = require("express").Router();
    
    router.post("/", vacuna_mascota.create);

    app.use('/api/vacuna_mascota', router);
}