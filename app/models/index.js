// usamos la función require para cargar el módulo db.config.js con los parámetros de la BD
const dbConfig = require("../config/db.config.js");
// cargamos Sequelize
const Sequelize = require("sequelize");

// inicializamos Sequelize con los datos de conexión
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
});

// objeto db que contendrá Sequelize y los modelos
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importamos los modelos
db.clientes = require("./cliente.model.js")(sequelize, Sequelize);
db.vehiculos = require("./vehiculo.model.js")(sequelize, Sequelize);
db.alquileres = require("./alquiler.model.js")(sequelize, Sequelize);

// aquí podemos definir relaciones entre modelos si es necesario
// un cliente puede tener muchos alquileres
db.clientes.hasMany(db.alquileres, { foreignKey: "id_cliente" });
db.alquileres.belongsTo(db.clientes, { foreignKey: "id_cliente" });

// un vehiculo puede tener muchos alquileres
db.vehiculos.hasMany(db.alquileres, { foreignKey: "id_vehiculo" });
db.alquileres.belongsTo(db.vehiculos, { foreignKey: "id_vehiculo" });

// exportamos el objeto db para usarlo en controladores o rutas
module.exports = db;
