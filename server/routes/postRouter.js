const { Router } = require("express");

const routes = Router();
const postController = require("../controllers/postController.js");

routes.get("/", postController.index);
routes.get("/:id", postController.show);
routes.post("/", postController.store);
routes.put("/:id", postController.update);
routes.delete("/:id", postController.destroy);

module.exports = routes;
