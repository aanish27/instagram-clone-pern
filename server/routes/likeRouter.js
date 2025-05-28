const { Router } = require("express");

const routes = Router();
const likeController = require("../controllers/likeController.js");

routes.post("/", likeController.store);
routes.delete("/:id", likeController.destroy);

module.exports = routes;
