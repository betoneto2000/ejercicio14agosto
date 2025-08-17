module.exports = (sequelize, Sequelize) => {
    const Alquiler = sequelize.define("alquiler", {
        id_alquiler: {
            type: Sequelize.INTEGER,
            autoIncrement: true, 
            primaryKey: true
        },

        id_cliente: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_vehiculo: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        fecha_inicio: { 
            type: Sequelize.DATE, 
            allowNull: false
         },

        fecha_fin:    { 
            type: Sequelize.DATE,
            allowNull: false
        },

        precio_diario:{ 
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
         },

        total:{
            
            type: Sequelize.DECIMAL(10,2)
         },
         
        devuelto: {
             type: Sequelize.BOOLEAN, 
            defaultValue: false
         }
    });
    return Alquiler;
};
