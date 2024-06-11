const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Propietario = sequelize.define("tbl_propietario", {
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        },
        documento: {
            type: Sequelize.STRING
        },
        idTipoDocumento:{
            type: Sequelize.INTEGER,
            references:{
                model:'tbl_tipo_documento',
                key:'id'
            }
        },
        idNacionalidad:{
            type: Sequelize.INTEGER,
            references:{
                model:'tbl_nacionalidad',
                key:'id'
            }
        },
        ubigeo:{
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

    return Propietario;
};
