const { Router } = require("express");

const routes = Router();
const notificationController = require("../controllers/notificationController.js");

routes.get("/recent", notificationController.getNotifications);

module.exports = routes;
