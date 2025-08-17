const db = require("../models");
const Alquiler = db.alquileres;
const Cliente = db.clientes;
const Vehiculo = db.vehiculos;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo Alquiler
exports.create = (req, res) => {
    if (!req.body.id_cliente || !req.body.id_vehiculo || !req.body.fecha_inicio || !req.body.fecha_fin || !req.body.precio_diario) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Verificamos cliente
    Cliente.findByPk(req.body.id_cliente)
        .then(cliente => {
            if (!cliente) {
                res.status(400).send({ message: "Cliente no encontrado." });
                return;
            }

            // Verificamos vehículo
            Vehiculo.findByPk(req.body.id_vehiculo)
                .then(vehiculo => {
                    if (!vehiculo) {
                        res.status(400).send({ message: "Vehículo no encontrado." });
                        return;
                    }

                    if (!vehiculo.disponible) {
                        res.status(400).send({ message: "El vehículo no está disponible." });
                        return;
                    }

                    // Calcular total
                    const fechaInicio = new Date(req.body.fecha_inicio);
                    const fechaFin = new Date(req.body.fecha_fin);
                    const dias = Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
                    const total = dias * parseFloat(req.body.precio_diario);

                    // Creamos objeto
                    const alquiler = {
                        id_cliente: req.body.id_cliente,
                        id_vehiculo: req.body.id_vehiculo,
                        fecha_inicio: req.body.fecha_inicio,
                        fecha_fin: req.body.fecha_fin,
                        precio_diario: req.body.precio_diario,
                        total: total,
                        devuelto: false
                    };

                    // Guardamos el alquiler
                    Alquiler.create(alquiler)
                        .then(data => {
                            // Actualizamos el vehículo a no disponible
                            Vehiculo.update({ disponible: false }, { where: { id_vehiculo: req.body.id_vehiculo } })
                                .then(() => {
                                    res.send(data);
                                })
                                .catch(err => {
                                    res.status(500).send({
                                        message: err.message || "Error actualizando vehículo."
                                    });
                                });
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || "Error creando el Alquiler."
                            });
                        });
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error buscando Vehículo con id=" + req.body.id_vehiculo
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error buscando Cliente con id=" + req.body.id_cliente
            });
        });
};

// Obtener todos los Alquileres
exports.findAll = (req, res) => {
    const id_cliente = req.query.id_cliente;
    var condition = id_cliente ? { id_cliente: { [Op.eq]: id_cliente } } : null;

    Alquiler.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error recuperando Alquileres."
            });
        });
};

// Obtener un Alquiler por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Alquiler.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró Alquiler con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error recuperando Alquiler con id=" + id
            });
        });
};

// Actualizar un Alquiler por id
exports.update = (req, res) => {
    const id = req.params.id;

    Alquiler.update(req.body, { where: { id_alquiler: id } })
        .then(num => {
            if (num == 1) {
                if (req.body.devuelto === true) {
                    // Si devuelto = true, liberamos el vehículo
                    Alquiler.findByPk(id)
                        .then(alquiler => {
                            if (alquiler) {
                                Vehiculo.update({ disponible: true }, { where: { id_vehiculo: alquiler.id_vehiculo } });
                            }
                        });
                }

                res.send({ message: "Alquiler actualizado correctamente." });
            } else {
                res.send({
                    message: `No se pudo actualizar Alquiler con id=${id}. Quizás no existe o el body está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando Alquiler con id=" + id
            });
        });
};

// Eliminar un Alquiler por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Alquiler.destroy({ where: { id_alquiler: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Alquiler eliminado correctamente!" });
            } else {
                res.send({ message: `No se pudo eliminar Alquiler con id=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error eliminando Alquiler con id=" + id
            });
        });
};

// Eliminar todos los Alquileres
exports.deleteAll = (req, res) => {
    Alquiler.destroy({ where: {}, truncate: false })
        .then(nums => {
            res.send({ message: `${nums} Alquileres eliminados correctamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error eliminando todos los Alquileres."
            });
        });
};

// Encontrar todos los Alquileres activos
exports.findAllActivos = (req, res) => {
    Alquiler.findAll({ where: { devuelto: false } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error recuperando Alquileres activos."
            });
        });
};
