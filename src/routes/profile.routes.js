const express = require('express');
const ProfileController = require('../controllers/profile.controller');
const ProfileRouter = express.Router();

ProfileRouter.post('/process/health-data', ProfileController.processHealthData);

module.exports = ProfileRouter;
