const { Router } = require("express");

const routes = Router();
const commentController = require("../controllers/commentController.js");

routes.post("/", commentController.store);
routes.put("/:id", commentController.update);
routes.delete("/:id", commentController.destroy);

module.exports = routes;

