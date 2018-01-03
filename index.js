require('./services/passport');

const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoURI);


require('./routes/auth_routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);