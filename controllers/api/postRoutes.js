const router = require("express").Router();
const { Post, Comments } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  console.log("inside get comments fnc");
  try {
    const commentData = await Comments.findAll({
      where: {
        model: Post,
        attributes: ["id"],
      },
    });

    // Serialize data so the template can read it
    const comment = commentData.map((coms) => coms.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("post", {
      comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
