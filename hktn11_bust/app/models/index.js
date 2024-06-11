const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     operatorsAliases: false,

//     pool: {
//         max: dbConfig.pool.max,
//         min: dbConfig.pool.min,
//         acquire: dbConfig.pool.acquire,
//         idle: dbConfig.pool.idle
//     }
// });

const sequelize = new Sequelize('veterinariadb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql', 
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.mascotas = require("./mascota.model.js")(sequelize, Sequelize);
db.color = require("./color.model.js")(sequelize, Sequelize);
db.especie = require("./especie.model.js")(sequelize, Sequelize);
db.propietario = require("./propietario.model.js")(sequelize, Sequelize);
db.raza = require("./raza.model.js")(sequelize, Sequelize);
db.tipoDocumento = require("./tipoDocumento.model.js")(sequelize, Sequelize);
db.vacuna = require("./vacuna.model.js")(sequelize, Sequelize);
db.nacionalidad = require("./nacionalidad.model.js")(sequelize, Sequelize);
db.vacunaMascota = require("./vacuna_mascota.model.js")(sequelize, Sequelize);

//uno a muchos
db.raza.hasMany(db.mascotas, { as: "mascotas" });
//muchos a uno
db.mascotas.belongsTo(db.raza, {
    foreignKey: "idRaza",
    as: "raza",
});

db.especie.hasMany(db.mascotas, { as: "mascotas" });

db.mascotas.belongsTo(db.especie, {
    foreignKey: "idEspecie",
    as: "especie",
});

db.color.hasMany(db.mascotas, { as: "mascotas" });

db.mascotas.belongsTo(db.color, {
    foreignKey: "idColor",
    as: "color",
});

db.tipoDocumento.hasMany(db.propietario, { as: "propietario" });

db.propietario.belongsTo(db.tipoDocumento, {
    foreignKey: "idTipoDocumento",
    as: "tipoDocumento",
});

db.nacionalidad.hasMany(db.propietario, { as: "propietario" });

db.propietario.belongsTo(db.nacionalidad, {
    foreignKey: "idNacionalidad",
    as: "nacionalidad",
});

db.mascotas.belongsToMany(db.vacuna, {
    through: "tbl_vacuna_mascota",
    as: "vacunas",
    foreignKey: "idMascota",
});

db.vacuna.belongsToMany(db.mascotas, {
    through: "tbl_vacuna_mascota",
    as: "mascotas",
    foreignKey: "idVacuna",
});
module.exports = db;


