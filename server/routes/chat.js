var express = require('express');
var chat = require('../src/Chat/chat'); 

const router = express.Router();

router.route('/get/conversation/:user').get(chat.getCv); 

router.route('/create/conversation').post(chat.handleCv); 

router.route('/create/message').post(chat.sendMsg); 



module.exports = router;       
