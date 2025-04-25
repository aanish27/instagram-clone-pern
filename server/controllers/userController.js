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
    let users = null;
    if (req.query.all == "true") {
      users = await prisma.user.findMany({
        where: {
          id: {
            notIn: [req.user.id],
          },
        },
      });
    } else {
      users = await prisma.user.findMany({
        take: 30,
        where: {
          id: {
            notIn: [req.user.id],
          },
        },
      });
    }
    return res.json({ users: users });
  } catch (error) {
    return res.json({ error: error });
  }
});

const getAuth = asyncHandler(async (req, res) => {
  return res.json(req.user);
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

const getProfile = [
  searchUserValidator,
  asyncHandler(async (req, res) => {
    try {
      const result = await prisma.user.findFirst({
        where: {
          username: req.body.search,
        },
        include: {
          posts: true,
          UsersSavedPosts: {
            include: {
              post: { include: { creator: { select: { username: true } } } },
            },
          },
          _count: {
            select: { posts: true, Followee: true, Follower: true },
          },
        },
      });

      if (!result) {
        return res.status(404).json({ error: "No Matching Users" });
      }

      return res.json(result);
    } catch (error) {
      throw error;
    }
  }),
];

module.exports = {
  index,
  getAuth,
  store,
  show,
  update,
  destroy,
  search,
  getProfile,
};
