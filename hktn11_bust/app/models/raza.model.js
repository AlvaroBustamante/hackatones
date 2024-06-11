const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Raza = sequelize.define("tbl_raza", {
        descripcion: {
            type: Sequelize.STRING
        },
        activo:{
            type: Sequelize.BOOLEAN
        },
        usuarioCreacion:{
            type: Sequelize.INTEGER
        },
        fechaCreacion:{
            type: Sequelize.DATE
        },
        usuarioModificacion:{
            type: Sequelize.INTEGER
        },
        fechaModificacion:{
            type: Sequelize.DATE
        }
    });

    return Raza;
};
