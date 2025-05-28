const { Router } = require("express");

const routes = Router();
const postController = require("../controllers/postController.js");

routes.get("/", postController.getFeed);
routes.get("/saved", postController.getSavedPosts);
routes.get("/explore", postController.getExplore);
routes.get("/:id", postController.getPost);
routes.post("/saved/:id", postController.storeSavePost);
routes.post("/", postController.store);
routes.patch("/:id", postController.update);
routes.delete("/saved/:id", postController.deleteSavePost);
routes.delete("/:id", postController.destroy);

module.exports = routes;
