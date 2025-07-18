const { Router } = require("express");

const routes = Router();
const storyController = require("../controllers/storyController.js");

routes.get("/", storyController.getFeed);
routes.post("/", storyController.store);
routes.delete("/:id", storyController.destroy);

module.exports = routes;
