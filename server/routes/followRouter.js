const { Router } = require("express");

const routes = Router();
const followController = require("../controllers/followController.js");

routes.get("/", followController.index);
routes.get("/:id", followController.show);
routes.post("/", followController.store);
routes.put("/:id", followController.update);
routes.delete("/:id", followController.destroy);

module.exports = routes;
