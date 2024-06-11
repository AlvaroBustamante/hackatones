const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Nacionalidad = sequelize.define("tbl_nacionalidad", {
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

    return Nacionalidad;
};
