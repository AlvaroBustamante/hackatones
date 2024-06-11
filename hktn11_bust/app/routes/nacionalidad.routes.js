
module.exports = app => {
    const nacionalidad = require("../controllers/nacionalidad.controller.js");
    var router = require("express").Router();
    
    router.post("/", nacionalidad.create);

    app.use('/api/nacionalidad', router);
}