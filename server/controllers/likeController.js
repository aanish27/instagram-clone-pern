const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const {
  createLikeValidator,
  destroyLikeValidator,
} = require("../shared/middlewares/likeValidator");

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const store = [
  createLikeValidator,
  asyncHandler(async (req, res) => {
    req.body.creatorId = req.user.id;
    try {
      await prisma.like.create({
        data: req.body,
      });
      return res.send("Success");
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

const destroy = [
  destroyLikeValidator,
  asyncHandler(async (req, res) => {
    try {
      const like = await prisma.like.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!like) {
        return res.json({ error: "Posy not found" });
      }

      return res.json({ message: "Like deleted" });
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

module.exports = { store, destroy };
