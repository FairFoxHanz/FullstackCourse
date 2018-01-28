const mongoose = require("mognoose");
const requireLogin = require("../middlewares/require_login");
const requireCredits = require("../middlewares/require_credits");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get(
    "/api/surveys",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(",").map(email => ({ email })),
      _user: req.user.id,
      dateSent: Date.now()
    });

  });
};
