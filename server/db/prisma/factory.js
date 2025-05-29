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
    creatorId: faker.number.int({ min: 1, max: 1000 }),
    attachment: faker.image.urlPicsumPhotos({
      height: 1080,
      width: 1080,
      grayscale: false,
      blur: 0,
    }),
  };
};

const storySeeder = () => {
  return {
    creatorId: faker.number.int({ min: 1, max: 1000 }),
    attachment: faker.image.urlPicsumPhotos({
      height: 1080,
      width: 1080,
      grayscale: false,
      blur: 0,
    }),
  };
};

const followRequestSeeder = () => {
  return {
    followerId: faker.number.int({ min: 1, max: 1000 }),
    followeeId: faker.number.int({ min: 1, max: 1000 }),
  };
};

const followSeeder = () => {
  return {
    followerId: faker.number.int({ min: 1, max: 1000 }),
    followeeId: faker.number.int({ min: 1, max: 1000 }),
  };
};

const commentSeeder = () => {
  return {
    text: faker.book.title(),
    creatorId: faker.number.int({ min: 1, max: 1000 }),
    postId: faker.number.int({ min: 1, max: 1000 }),
  };
};

const postLikeSeeder = () => {
  return {
    creatorId: faker.number.int({ min: 1, max: 1000 }),
    postId: faker.number.int({ min: 1, max: 1000 }),
  };
};

const commentLikeSeeder = () => {
  return {
    creatorId: faker.number.int({ min: 1, max: 1000 }),
    commentId: faker.number.int({ min: 1, max: 1000 }),
  };
};

const storyLikeSeeder = () => {
  return {
    creatorId: faker.number.int({ min: 1, max: 1000 }),
    storyId: faker.number.int({ min: 1, max: 1000 }),
  };
};

const usersSavedPostsSeeder = () => {
  return {
    userId: faker.number.int({ min: 1, max: 1000 }),
    postId: faker.number.int({ min: 1, max: 1000 }),
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
  commentLikeSeeder,
  postLikeSeeder,
  storyLikeSeeder,
  usersSavedPostsSeeder,
};
