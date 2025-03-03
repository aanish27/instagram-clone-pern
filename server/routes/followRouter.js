const { Router } = require("express");

const routes = Router();
const followController = require("../controllers/followController.js");

routes.post("/req", followController.createFollowRequest);
routes.post("/", followController.createFollow);
routes.delete("/req/:id", followController.destroyFollowRequest);
routes.delete("/:id", followController.destroyFollow);

module.exports = routes;
