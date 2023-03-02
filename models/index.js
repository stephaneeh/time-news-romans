const User = require("./User");
const Post = require("./Post");
const Comments = require("./Comment");

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

// blog post can have multiple comments
Post.hasMany(Comments, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// comments belongs to one blog post
Comments.belongsTo(Post, {
  foreignKey: "post_id",
});

// associate user

Comments.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Comments, {
  foreignKey: "user_id",
  // onDelete: 'CASCADE',
});

module.exports = { User, Post, Comments };
