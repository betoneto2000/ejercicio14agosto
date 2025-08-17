module.exports = app => {
    const clientes = require("../controllers/cliente.controller.js");
    var router = require("express").Router();
    // Create a new Cliente
    router.post("/create/", clientes.create);
    // Retrieve all Clientes
    router.get("/", clientes.findAll);
    // Retrieve a single Cliente by id
    router.get("/:id", clientes.findOne);
    // Update a Cliente by id
    router.put("/update/:id", clientes.update);
    // Delete a Cliente by id
    router.delete("/delete/:id", clientes.delete);
    // Delete all Clientes
    router.delete("/delete/", clientes.deleteAll);

    // Endpoint base: http://localhost:8081/api/cliente/
    app.use("/api/cliente", router);
};
