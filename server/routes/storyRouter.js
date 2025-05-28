const { Router } = require("express");

const routes = Router();
const storyController = require("../controllers/storyController.js");

routes.get("/", storyController.index);
routes.get("/:id", storyController.show);
routes.post("/", storyController.store);
routes.put("/:id", storyController.update);
routes.delete("/:id", storyController.destroy);

module.exports = routes;
