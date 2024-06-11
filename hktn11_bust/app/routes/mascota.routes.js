
module.exports = app => {
    const mascota = require("../controllers/mascota.controller.js");
    var router = require("express").Router();
    
    router.post("/", mascota.create);

    app.use('/api/mascota', router);
}