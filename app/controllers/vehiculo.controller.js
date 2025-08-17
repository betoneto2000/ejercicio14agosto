
const db = require("../models");
const Vehiculo = db.vehiculos;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.marca) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Creamos un objeto con la estructura que recibimos en el request
    const vehiculo = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        anio: req.body.anio,
        tipo: req.body.tipo,
        matricula: req.body.matricula,
        disponible: req.body.disponible ? req.body.disponible : true
    };

    // Guardamos el nuevo Vehiculo en la base de datos
    Vehiculo.create(vehiculo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Vehiculo."
            });
        });
};

// Retrieve all Vehiculos from the database.
exports.findAll = (req, res) => {
    const marca = req.query.marca;
    var condition = marca ? { marca: { [Op.iLike]: `%${marca}%` } } : null;

    Vehiculo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving vehiculos."
            });
        });
};

// Find a single Vehiculo with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Vehiculo.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Vehiculo with id=" + id
            });
        });
};

// Update a Vehiculo by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Vehiculo.update(req.body, {
        where: { id_vehiculo: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Vehiculo was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Vehiculo with id=${id}. Maybe Vehiculo was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Vehiculo with id=" + id
            });
        });
};

// Delete a Vehiculo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Vehiculo.destroy({
        where: { id_vehiculo: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Vehiculo was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Vehiculo with id=${id}. El vehiculo no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Vehiculo with id=" + id
            });
        });
};

// Delete all Vehiculos from the database.
exports.deleteAll = (req, res) => {
    Vehiculo.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Vehiculos were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all vehiculos."
            });
        });
};

// find all available Vehiculos
exports.findAllAvailable = (req, res) => {
    Vehiculo.findAll({ where: { disponible: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving available vehiculos."
            });
        });
};
