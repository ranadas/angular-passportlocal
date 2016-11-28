var express = require('express');
var router = express.Router();
/* 
* GET ping response ().pong
* vurl -X GET http://localhost:3000/ping
*/
router.get('/', function(req, res){
    res.status(200).send("ping-pong! I'm alive");
});

require('./route-docu')(router.stack, 'express');
module.exports = router;
