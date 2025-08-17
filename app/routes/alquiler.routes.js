module.exports = app => {
    const alquileres = require("../controllers/alquiler.controller.js");
    var router = require("express").Router();

    // Create a new Alquiler (calcula total y bloquea el vehículo)
    router.post("/create/", alquileres.create);
    // Retrieve all Alquileres (filtros: ?devuelto=true/false&id_cliente=&id_vehiculo=)
    router.get("/", alquileres.findAll);
    // Retrieve a single Alquiler
    router.get("/:id", alquileres.findOne);
    // Update an Alquiler
    router.put("/update/:id", alquileres.update);
    // Mark return (devuelto=true) y libera vehículo
   router.put("/return/:id", alquileres.update);

    // Delete one / all
    router.delete("/delete/:id", alquileres.delete);
    router.delete("/delete/", alquileres.deleteAll);

      // Endpoint base: http://localhost:8081/api/alquiler/
    app.use("/api/alquiler", router);
};
