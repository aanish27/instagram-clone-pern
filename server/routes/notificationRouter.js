const { Router } = require("express");

const routes = Router();
const notificationController = require("../controllers/notificationController.js");

routes.get("/recent", notificationController.getNotifications);
routes.get("/count", notificationController.getCount);
routes.patch("/read", notificationController.markAsReadAll);

module.exports = routes;
