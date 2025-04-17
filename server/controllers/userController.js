const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const {
  updateUserValidator,
  getUserByIdValidator,
  searchUserValidator,
} = require("../shared/middlewares/validators/userValidator");

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const store = asyncHandler(async (req, res) => {
  try {
    await prisma.user.create({
      data: req.body,
    });
    return res.send("Success");
  } catch (error) {
    return res.json({ error: error });
  }
});

const index = asyncHandler(async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          notIn: [req.user.id],
        },
      },
    });
    return res.json({ users: users });
  } catch (error) {
    return res.json({ error: error });
  }
});

const show = [
  getUserByIdValidator,
  asyncHandler(async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!user) {
        return res.json({ error: "user not found" });
      }

      return res.json(user);
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

const update = [
  updateUserValidator, //chainning middlewares
  asyncHandler(async (req, res) => {
    try {
      const user = await prisma.user.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: req.body,
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

const destroy = [
  getUserByIdValidator,
  asyncHandler(async (req, res) => {
    try {
      const user = await prisma.user.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!user) {
        return res.json({ error: "user not found" });
      }

      return res.json({ message: "user deleted" });
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

const search = [
  searchUserValidator,
  asyncHandler(async (req, res) => {
    try {
      const result = await prisma.user.findMany({
        where: {
          username: {
            contains: req.body.search,
          },
        },
      });

      if (!result) {
        return res.json({ error: "No Matching Users" });
      }

      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  }),
];

module.exports = { index, store, show, update, destroy, search };
