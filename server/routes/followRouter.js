const { Router } = require("express");

const routes = Router();
const followController = require("../controllers/followController.js");

routes.get("/search", followController.search);
routes.post("/req", followController.sendFollowRequest);
routes.post("/", followController.acceptFollowRequest);
routes.delete("/req/:id", followController.cancelFollowRequest);
routes.delete("/:id", followController.unfollowUser);
routes.delete("/remove/:id", followController.removeFollower);

module.exports = routes;
