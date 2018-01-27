require('./models/user');
require('./services/passport');

const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect(keys.mongoURI);

//MIDDLEWARE:
//cookieSession sends data inside req.session
app.use(cookieSession({
    //Age set to 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

require('./routes/auth_routes')(app);
require('./routes/billing_routes')(app);

if(process.env.NODE_ENV == 'production'){
   app.use(express.static('client/build'));

   const path = require('path');
   app.get('*', (req,res) => {
       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);