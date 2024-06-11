
module.exports = app => {
    const especie = require("../controllers/especie.controller.js");
    var router = require("express").Router();
    
    router.post("/", especie.create);

    app.use('/api/especie', router);
}