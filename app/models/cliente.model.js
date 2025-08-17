
module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
        id_cliente: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING(100)
        },
        email: {
            type: Sequelize.STRING(100),
            
        },
        telefono: {
            type: Sequelize.STRING(20)
        },
        direccion: {
            type: Sequelize.STRING(150)
        },
        fecha_registro: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });
    return Cliente;
};
