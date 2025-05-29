const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
  userSeeder,
  commentSeeder,
  storySeeder,
  factory,
  followRequestSeeder,
  followSeeder,
  postSeeder,
  postLikeSeeder,
  commentLikeSeeder,
  storyLikeSeeder,
  usersSavedPostsSeeder,
} = require("./factory");

async function main() {
  //default user
  await prisma.user.create({
    data: {
      name: "admin",
      username: "admin99",
      bio: "mysterio",
      email: "admin@example.com",
      phone: "947677632",
      password: "$2b$10$yEMGpvDukKwlHOFK7Ls7uOoph8RhLdlD.nrdgGhWg5BqdPmGoPgbq", //password
    },
  });

  await prisma.user.createMany({
    data: factory(1000, userSeeder),
    skipDuplicates: true,
  });

  await prisma.post.createMany({
    data: factory(1000, postSeeder),
    skipDuplicates: true,
  });

  await prisma.follow.createMany({
    data: factory(10000, followSeeder),
    skipDuplicates: true,
  });

  await prisma.followRequest.createMany({
    data: factory(1000, followRequestSeeder),
    skipDuplicates: true,
  });

  await prisma.comment.createMany({
    data: factory(100000, commentSeeder),
    skipDuplicates: true,
  });

  await prisma.story.createMany({
    data: factory(1000, storySeeder),
    skipDuplicates: true,
  });

  await prisma.like.createMany({
    data: factory(10000, postLikeSeeder),
    skipDuplicates: true,
  });

  await prisma.like.createMany({
    data: factory(10000, commentLikeSeeder),
    skipDuplicates: true,
  });

  await prisma.like.createMany({
    data: factory(10000, storyLikeSeeder),
    skipDuplicates: true,
  });

  await prisma.usersSavedPosts.createMany({
    data: factory(10000, usersSavedPostsSeeder),
    skipDuplicates: true,
  });

  await prisma.notification.createMany({
    data: factory(10000, usersSavedPostsSeeder),
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
