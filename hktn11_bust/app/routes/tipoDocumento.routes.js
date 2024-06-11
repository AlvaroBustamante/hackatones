
module.exports = app => {
    const tipoDocumento = require("../controllers/tipoDocumento.controller.js");
    var router = require("express").Router();
    
    router.post("/", tipoDocumento.create);

    app.use('/api/tipoDocumento', router);
}