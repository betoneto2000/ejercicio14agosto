const db = require("../models");
const Cliente = db.clientes;
const Op = db.Sequelize.Op;

// Create and Save a new Cliente
exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "El nombre y el email son obligatorios!"
        });
        return;
    }

    const cliente = {
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion
        // fecha_registro no se envía porque tiene valor por defecto
    };

    Cliente.create(cliente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al crear el cliente."
            });
        });
};

// Retrieve all Clientes
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Cliente.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los clientes."
            });
        });
};

// Retrieve a single Cliente by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cliente.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener cliente con id=" + id
            });
        });
};

// Update Cliente by id
exports.update = (req, res) => {
    const id = req.params.id;

    Cliente.update(req.body, {
        where: { id_cliente: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cliente actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el cliente con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar cliente con id=" + id
            });
        });
};

// Delete a Cliente by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Cliente.destroy({
        where: { id_cliente: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cliente eliminado correctamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el cliente con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar cliente con id=" + id
            });
        });
};

// Delete all Clientes
exports.deleteAll = (req, res) => {
    Cliente.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} clientes fueron eliminados correctamente!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al eliminar todos los clientes."
            });
        });
};
