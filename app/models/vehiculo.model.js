
module.exports = (sequelize, Sequelize) => {
    const Vehiculo = sequelize.define("vehiculo", {
        id_vehiculo: {
            type: Sequelize.INTEGER,
            autoIncrement: true, 
            primaryKey: true
        },

        marca: {
            type: Sequelize.STRING(50)
        },

        modelo: {
            type: Sequelize.STRING(50)
        },

        anio: {
            type: Sequelize.INTEGER
        },

        tipo: {
            type: Sequelize.STRING(30)
        },

        matricula: {
            type: Sequelize.STRING(15),
            unique: true
        },
        
        disponible: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    return Vehiculo;
};


