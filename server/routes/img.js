var express = require('express');
var upLoadController = require('../src/img/ImgController.js'); 

const router = express.Router();

router.route('/user/img').get(upLoadController.getImgController); 

router.route('/user/up-img').post(upLoadController.uploadImgController); 


module.exports = router;       
