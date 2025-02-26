const { Router } = require("express");

const routes = Router();
const likeController = require("../controllers/likeController.js");

routes.get("/", likeController.index);
routes.get("/:id", likeController.show);
routes.post("/", likeController.store);
routes.put("/:id", likeController.update);
routes.delete("/:id", likeController.destroy);

module.exports = routes;
