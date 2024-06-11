const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const VacunaMascota = sequelize.define("tbl_vacuna_mascota", {
        idMascota:{
            type: Sequelize.INTEGER,
            references:{
                model:'tbl_mascota',
                key:'id'
            }
        },
        idVacuna:{
            type: Sequelize.INTEGER,
            references:{
                model:'tbl_vacuna',
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

    return VacunaMascota;
};
