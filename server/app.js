const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

const userRoutes = require("./routes/userRouter");
const authRoutes = require("./routes/authRouter")
// const postRoutes = require("./routes/postRouter");
// const commentRoutes = require("./routes/commentRouter");
// const storyRoutes = require("./routes/storyRouter");
// const followRoutes = require("./routes/followRouter");
// const likeRoutes = require("./routes/likeRouter");

app.use("/login", authRoutes.login)
app.use("/user", userRoutes);
// app.use("/post", postRoutes);
// app.use("/comment", commentRoutes);
// app.use("/story", storyRoutes);
// app.use("/follow", followRoutes);
// app.use("/like", likeRoutes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
