const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    console.log("what is this doing?"); //FIXME:
    console.log(postData);
    if (!postData) {
      res.status(404).json({ message: "No post found with that id" });
      return;
    }

    const updatePost = postData.get({ plain: true });

    res.render("editPost", {
      updatePost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      { title: req.body.updatedName, description: req.body.updatedContent },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedPost) {
      res.status(404).json({
        message: "Not able to update post at this time. Try again later.",
      });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
