const router = require("express").Router();
const { Comments, Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:id", withAuth, async (req, res) => {
  try {
    // console.log('Hello'); //used for debugging purposes
    const commentData = await Comments.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["name"] }, { model: Post }],
    });

    const commentInfo = commentData.get({ plain: true });
    console.log(commentInfo);
    res.render("updateComment", {
      commentInfo,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    console.log("inside comment POST request");
    const id = req.session.user_id;
    const newComment = await Comments.create(
      {
        comment: req.body.comment,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      },
      {
        where: {
          user_id: id,
        },
      }
    );

    const userComment = newComment.get({ plain: true });

    res.render("post", {
      userComment,
      logged_in: req.session.logged_in,
    });

    res.status(200).json(userComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const chosenId = req.params.id;
    const deletedComment = await Comments.destroy({
      where: {
        id: chosenId,
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: "No Comment with this id!" });
      return;
    }

    deletedComment;
    res.status(200).json({ message: "Commet successfully deleted." });
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
