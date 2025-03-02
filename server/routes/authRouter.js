const { Router } = require("express");

const routes = Router();
const { login, signUp, logout } = require("../controllers/authController");

routes.post("/login", login);
routes.post("/signup", signUp);
routes.get("/logout", logout);

module.exports = { login, signUp, logout };
