const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Mascota = sequelize.define("tbl_mascotas", {
        nombre: {
            type: Sequelize.STRING
        },
        fechaNacimiento: {
            type: Sequelize.DATE
        },
        idEspecie:{
            type: Sequelize.INTEGER,
            references:{
                model:'tbl_especie',
                key:'id'
            }
        },
        idRaza:{
            type: Sequelize.INTEGER,
            references:{
                model:'tbl_raza',
                key:'id'
            }
        },
        idColor:{
            type: Sequelize.INTEGER,
            references:{
                model:'tbl_color',
                key:'id'
            }
        },
        idPropietario:{
            type: Sequelize.INTEGER,
            references:{
                model:'tbl_especie',
                key:'id'
            }
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

    return Mascota;
};
