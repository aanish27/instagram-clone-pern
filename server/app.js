const express = require("express");
const cookieParser = require("cookie-parser");
var cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

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



// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
