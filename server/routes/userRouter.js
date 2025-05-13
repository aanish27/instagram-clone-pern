const { Router } = require("express");

const routes = Router();
const userController = require("../controllers/userController.js");

routes.get("/", userController.getSuggestions);
routes.get("/auth", userController.getAuth);
routes.get("/search", userController.search);
routes.get("/profile", userController.getProfile);
routes.put("/:id", userController.update);
routes.patch("/profile", userController.updateProfilePicture);
// routes.delete("/profile", userController.deleteProfilePicture);
routes.delete("/:id", userController.destroy);


module.exports = routes;
