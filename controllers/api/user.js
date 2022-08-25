const router = require("express").Router();
const { User, Favorites, Teams } = require("../../models");

//TODO ⬇️
router.get("/", (req, res) => {});
//TODO ⬇️
router.get("/:id", (req, res) => {});
//TODO ⬇️
router.post("/", (req, res) => {});

//route to log in user
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res
        .status(404)
        .json({ message: "There is no user found with that email address!" });
      return;
    }
    
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(404).json({ message: "Incorrect password!" });
      return;
    }

    req.session.loggedIn = true;

    req.session.save(() => {
      (req.session.user_id = dbUserData.id),
        (req.session.username = dbUserData.username);

      res.json({ user: dbUserData, message: "You are now logged in! " });
    });
  });
});

//route to log user out
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//TODO ⬇️
router.put("/:id", (req, res) => {});

//TODO ⬇️
router.delete("/:id", (req, res) => {});

module.exports = router;
