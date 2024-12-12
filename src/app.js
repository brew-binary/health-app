const express = require('express');
const bodyParser = require('body-parser');
const ProfileRouter = require('./routes/profile.routes');
const { sequelize } = require('./model');
const { checkForAuth } = require('./middleware/auth');

const app = express();
const version = 'v1';
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

app.use(`/api/${version}/profile`, checkForAuth, ProfileRouter);

module.exports = app;
