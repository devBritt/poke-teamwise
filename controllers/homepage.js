const router = require("express").Router();

router.get("/", (req, res) => {
  if (req.session.loggedIn) res.redirect("/dashboard");
  else res.sendFile("homepage.html", { root: path.join(__dirname, "public") });
});

router.get("/dashboard", (req, res) => {
  if (req.session.loggedIn) {
    res.setHeader("Content-Type", "text/html");
    res.write("Welcome " + req.session.username + " to your dashboard");
    res.write('<a href="/logout">Logout</a>');
    res.end();
  } else res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.sendFile("login.html", { root: path.join(__dirname, "public") });
});

router.post(
  "/authenticate",
  (req, res, next) => {
    if (req.body.username == "foo" && req.body.password == "bar") {
      res.locals.username = req.body.username;
      next();
    } else res.sendStatus(401);
  },
  (req, res) => {
    req.session.destroy((err) => {});
    res.send("Thank you!");
  }
);

module.exports = router;
