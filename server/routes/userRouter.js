const { Router } = require("express");

const routes = Router();
const userController = require("../controllers/userController.js");

routes.get("/", userController.getSuggestions);
routes.get("/auth", userController.getAuth);
routes.get("/search", userController.search);
routes.get("/profile", userController.getProfile);
routes.get("/:search", userController.getUser);
routes.patch("/", userController.update);
routes.patch("/avatar", userController.updateAvatar);
routes.delete("/avatar", userController.deleteAvatar);
routes.delete("/:id", userController.destroy);


module.exports = routes;
