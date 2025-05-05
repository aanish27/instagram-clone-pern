const { Router } = require("express");

const routes = Router();
const authController = require("../controllers/authController");

routes.post("/login", authController.login);
routes.post("/signup", authController.register);
routes.post("/logout", authController.logout);

module.exports = routes;
