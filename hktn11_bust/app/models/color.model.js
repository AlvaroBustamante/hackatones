const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Color = sequelize.define("tbl_color", {
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

    return Color;
};
