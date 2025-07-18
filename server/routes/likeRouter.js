const { Router } = require("express");

const routes = Router();
const likeController = require("../controllers/likeController.js");

routes.post("/post", likeController.storePostLike);
routes.post("/story", likeController.storeStoryLike);
routes.delete("/post/:id", likeController.destroyPostLike);
routes.delete("/story/:id", likeController.destroyStoryLike);

module.exports = routes;
