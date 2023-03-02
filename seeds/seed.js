const sequelize = require("../config/connection");
const { Post, User, Comments } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log("--------------User DATA SEEDED--------------");

  await Post.bulkCreate(postData, {
    returning: true,
  });

  console.log("--------------Post DATA SEEDED--------------");

  await Comments.bulkCreate(commentData, {
    returning: true,
  });

  console.log("--------------Comment DATA SEEDED--------------");
  console.log("--------------ALL DATA SEEDED--------------");

  process.exit(0);
};

seedDatabase();
