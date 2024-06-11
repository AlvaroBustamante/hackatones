
module.exports = app => {
    const vacuna = require("../controllers/vacuna.controller.js");
    var router = require("express").Router();
    
    router.post("/", vacuna.create);

    app.use('/api/vacuna', router);
}