const asyncHandler = require("express-async-handler");
const NotificationService = require("../services/NotificationService");

const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await NotificationService.recentNotifications(
    req.user.id,
  );
  return res.json(notifications);
});

module.exports = { getNotifications };
