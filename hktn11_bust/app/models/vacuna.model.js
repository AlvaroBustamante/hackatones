const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Especie = sequelize.define("tbl_especie", {
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

    return Especie;
};
