module.exports = app => {
    const vehiculos = require("../controllers/vehiculo.controller.js");
    var router = require("express").Router();

    // Create a new Vehiculo
    router.post("/create/", vehiculos.create);
    // Retrieve all Vehiculos
    router.get("/", vehiculos.findAll);
    // Retrieve all available Vehiculos
    router.get("/available", vehiculos.findAllAvailable);
    // Retrieve a single Vehiculo with id
    router.get("/:id", vehiculos.findOne);
    // Update a Vehiculo with id
    router.put("/update/:id", vehiculos.update);
    // Delete a Vehiculo with id
    router.delete("/delete/:id", vehiculos.delete);
    // Delete all Vehiculos
    router.delete("/delete/", vehiculos.deleteAll);

    // Endpoint base: http://localhost:8081/api/vehiculo/
    app.use("/api/vehiculo", router);
};


