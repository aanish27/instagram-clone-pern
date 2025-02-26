const { Router } = require("express");

const routes = Router();
const userController = require("../controllers/userController.js");

routes.get("/", userController.index);
routes.get("/:id", userController.show);
routes.post("/", userController.store);
routes.put("/:id", userController.update);
routes.delete("/:id", userController.destroy);

module.exports = routes;
