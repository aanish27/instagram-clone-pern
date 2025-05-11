const { Router } = require("express");

const routes = Router();
const commentController = require("../controllers/commentController.js");

routes.get("/post/:id", commentController.getComments);
routes.post("/", commentController.store);
routes.put("/:id", commentController.update);
routes.delete("/:id", commentController.destroy);

module.exports = routes;

