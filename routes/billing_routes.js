const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require('../middlewares/require_login');

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {

    const charge = await stripe.charges.create({
      ammount: 500,
      currenty: "usd",
      description: "5$ for 5 credits",
      source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
