const mongoose = require("mongoose");
const requireLogin = require("../middlewares/require_login");
const requireCredits = require("../middlewares/require_credits");
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys", (req, res) => {});

  app.post("/api/surveys/webhooks", (req, res) => {});

  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
  });
};
