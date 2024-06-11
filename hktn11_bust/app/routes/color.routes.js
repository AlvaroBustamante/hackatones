
module.exports = app => {
    const color = require("../controllers/color.controller.js");
    var router = require("express").Router();
    
    router.post("/", color.create);

    app.use('/api/color', router);
}