const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

//find all posts that belong to user
router.get("/", withAuth, async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new post post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update a specific post
router.put("/:id", withAuth, async (req, res) => {
  // update a category by its `id` value
  try {
    const updateById = await Post.update(
      { title: req.body.title },
      { where: { id: req.params.id } }
    );

    if (!updateById) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(updateById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const chosenId = req.params.id;
    const deletePost = await Post.destroy({
      where: {
        id: chosenId,
      },
    });

    if (!deletePost) {
      res.status(404).json({ message: "No Post with this id!" });
      return;
    }

    deletePost;
    res.status(200).json({ message: "Post successfully deleted." });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
