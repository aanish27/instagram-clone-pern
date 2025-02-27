const { Router } = require("express");

const routes = Router();
const { login, signUp } = require("../controllers/authController");

routes.post("/login", login);
routes.post("/signup", signUp);

module.exports = {login , signUp}
