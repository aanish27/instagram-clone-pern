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

app.use("/", authRoutes);
app.use("/user", verifyToken, userRoutes);
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
