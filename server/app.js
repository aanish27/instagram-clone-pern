const express = require("express");
const cookieParser = require("cookie-parser");
var cors = require("cors");
require("dotenv").config();
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_ORIGIN,
  }),
);
app.use(express.static("uploads"));
const verifyToken = require("./shared/middlewares/verifyToken");
const authRoutes = require("./routes/authRouter");
const userRoutes = require("./routes/userRouter");
const postRoutes = require("./routes/postRouter");
const commentRoutes = require("./routes/commentRouter");
const storyRoutes = require("./routes/storyRouter");
const followRoutes = require("./routes/followRouter");
const likeRoutes = require("./routes/likeRouter");
const notificationRoutes = require("./routes/notificationRouter");
const eventBus = require("./shared/utils/eventBus");
const NotificationService = require("./services/NotificationService");
const UserService = require("./services/UserService");

app.use("/", authRoutes);
app.use("/user", verifyToken, userRoutes);
app.use("/notifications", verifyToken, notificationRoutes);

// --- SSE: Client subscribes here ---
const activeClients = new Map();
app.get("/notifications/connect", verifyToken, (req, res) => {
  const userId = req.user.id;
  if (!userId) return res.status(400).send("Missing userId");

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  activeClients.set(userId, res);

  req.on("close", () => {
    activeClients.delete(userId);
  });
});

eventBus.on("send_notification", async (data) => {
  const followers = await UserService.getFollowers(data.senderId);
  followers.forEach(async (follower) => {
    const f = follower.follower.id;
    const newData = { ...data };
    newData.receiverId = f;
    await NotificationService.store(newData);
    const client = activeClients.get(f);
    if (client) {
      client.write(`data: refresh\n\n`);
    }
  });
});

app.use("/post", verifyToken, postRoutes);
app.use("/comment", verifyToken, commentRoutes);
app.use("/story", verifyToken, storyRoutes);
app.use("/follow", verifyToken, followRoutes);
app.use("/like", verifyToken, likeRoutes);

app.use("/", async (req, res) => {
  res.send("Welcome to Instagram Clone Made By Me!!!");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json(err.message);
});

server.listen(process.env.PORT || 3000, () => {
  console.log("server running at http://localhost:3000");
});
