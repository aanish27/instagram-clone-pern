const { Router } = require("express");

const routes = Router();
const userController = require("../controllers/userController.js");

routes.get("/", userController.index);
routes.get("/auth", userController.getAuth);
routes.get("/search", userController.search);
routes.get("/profile", userController.getProfile);
routes.post("/", userController.store);
routes.put("/:id", userController.update);
routes.delete("/:id", userController.destroy);

module.exports = routes;
