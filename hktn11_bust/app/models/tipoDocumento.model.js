const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const TipoDocumento = sequelize.define("tbl_tipo_documento", {
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

    return TipoDocumento;
};
