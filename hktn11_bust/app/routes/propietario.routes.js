
module.exports = app => {
    const propietario = require("../controllers/propietario.controller.js");
    var router = require("express").Router();
    
    router.post("/", propietario.create);

    app.use('/api/propietario', router);
}