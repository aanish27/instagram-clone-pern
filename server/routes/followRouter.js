const { Router } = require("express");

const routes = Router();
const followController = require("../controllers/followController.js");

routes.get("/search", followController.search);
routes.post("/req", followController.createFollowRequest);
routes.post("/", followController.createFollow);
routes.delete("/req/:id", followController.destroyFollowRequest);
routes.delete("/:id", followController.destroyFollow);
routes.delete("/remove/:id", followController.destroyFollower);

module.exports = routes;
