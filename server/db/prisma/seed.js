const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");
// const bcrypt = require("bcrypt");

async function main() {
  //default user
  await prisma.user.create({
    data: {
      name: "admin",
      username: "admin99",
      bio: "misterio",
      email: "admin@example.com",
      phone: "947677632",
      password: "$2b$10$yEMGpvDukKwlHOFK7Ls7uOoph8RhLdlD.nrdgGhWg5BqdPmGoPgbq", //password
    },
  });

  // const saltRounds = 10;
  // let password = null
  // await bcrypt.hash("password", saltRounds, function (err, hash) {
  //   if (err) {
  //     throw err;
  //   }
  //   password = hash
  // });

  const lastName = faker.person.lastName();
  await prisma.user.create({
    data: {
      name: faker.person.lastName(),
      username: faker.internet.username({ lastName: lastName }),
      bio: faker.book.title(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: "international" }),
      password: "password",
    },
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
