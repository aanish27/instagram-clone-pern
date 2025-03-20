const { faker } = require("@faker-js/faker");

const factory = (total, seeder) => {
  const objects = [];
  for (let i = 0; i < total; i++) {
    const object = seeder();
    objects.push(object);
  }
  return objects;
};

const userSeeder = () => {
  const lastName = faker.person.lastName();
  return {
    name: lastName,
    username: faker.internet.username({ lastName: lastName }),
    bio: faker.book.title(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: "international" }),
    profile_pic: faker.image.personPortrait(),
    password: "password",
  };
};

const postSeeder = () => {
  return {
    caption: faker.internet.emoji(),
    creatorId: faker.number.int({ min: 1, max: 30 }),
    attachment: faker.image.urlPicsumPhotos({
      height: 450,
      width: 450,
      grayscale: false,
      blur: 0,
    }),
  };
};

const storySeeder = () => {
  return {
    creatorId: faker.number.int({ min: 1, max: 30 }),
    attachment: faker.image.urlPicsumPhotos(),
  };
};

const followRequestSeeder = () => {
  return {
    followerId: faker.number.int({ min: 1, max: 30 }),
    followeeId: faker.number.int({ min: 1, max: 30 }),
  };
};

const followSeeder = () => {
  return {
    followerId: faker.number.int({ min: 1, max: 30 }),
    followeeId: faker.number.int({ min: 1, max: 30 }),
  };
};

const commentSeeder = () => {
  return {
    text: faker.book.title(),
    creatorId: faker.number.int({ min: 1, max: 30 }),
    postId: faker.number.int({ min: 1, max: 20 }),
  };
};

module.exports = {
  commentSeeder,
  storySeeder,
  factory,
  postSeeder,
  userSeeder,
  followRequestSeeder,
  followSeeder,
};
