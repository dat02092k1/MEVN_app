var express = require('express');
var userController = require('../src/user/userController'); 
const router = express.Router();

router.route('/user/getAll').get(userController.getDataControllerfn);  

router.route('/user/create').post(userController.createUserControllerFn);

router.route('/user/update/:id').patch(userController.updateUserControllerFn);

router.route('/user/remove/:id').delete(userController.deleteUserControllerFn);

router.route('/user/login').post(userController.loginController);


module.exports = router;       
