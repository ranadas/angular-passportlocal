'use strict';
const express = require('express');
const router = express.Router();

const pingController  = require('./ping-service');
//const apiController   = require('./api-service');

//TODO expose rest/pong
//router.get('/pong', pingController.pong);

require('./route-docu')(router.stack, 'express');
module.exports = router;