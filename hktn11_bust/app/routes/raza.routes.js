
module.exports = app => {
    const raza = require("../controllers/raza.controller.js");
    var router = require("express").Router();
    
    router.post("/", raza.create);

    app.use('/api/raza', router);
}