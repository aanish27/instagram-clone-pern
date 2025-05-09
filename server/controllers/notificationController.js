const asyncHandler = require("express-async-handler");
const NotificationService = require("../services/NotificationService");

const getNotifications = asyncHandler(async (req, res) => {
  try {
    const notifications = await NotificationService.recentNotifications(
      req.user.id,
    );
    return res.json(notifications);
  } catch (error) {
    throw error;
  }
});

const markAsReadAll = asyncHandler(async (req, res) => {
  try {
    await NotificationService.markAsReadAll(req.user.id);
    return res.send("done");
  } catch (error) {
    throw error;
  }
});

const getCount = asyncHandler(async (req, res) => {
  try {
    const count = await NotificationService.getCount(req.user.id);
    return res.json(count);
  } catch (error) {
    throw error;
  }
});

module.exports = { getNotifications, markAsReadAll, getCount };
