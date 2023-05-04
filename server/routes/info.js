var express = require('express');
var termController = require('../src/term/termController'); 
var scoreController = require('../src/score/scoreController'); 
var taskController = require('../src/task/taskController'); 

var gpa = require('../src/score/gpaController'); 

var courseController = require('../src/course/courseController'); 

const router = express.Router();

router.route('/user/add-term').post(termController.addTerm);  
// add term
router.route('/user/get-term/:termId').get(termController.getTerm);  
// get specified term
router.route('/user/add-course').post(courseController.addCourse);  
// add course
router.route('/user/add-term').put(termController.addGrade);  
router.route('/user/add-score').post(scoreController.addScore);  
router.route('/user/gpa').post(gpa.calculateGPA);  
router.route('/user/get-gpa/:id').get(gpa.getGPA );  
router.route('/user/calculate-gpa/:id').patch(gpa.calculateGPA );  
router.route('/user/getscore/:id').get(gpa.getScore ); 
// tasks assigning 
router.route('/user/assign-task').post(taskController.assignTask);     
router.route('/user/edit-task/:id').patch(taskController.editTask);       
router.route('/user/delete-task/:id').delete(taskController.deleteTask);       
router.route('/user/view-task').get(taskController.getTasks);       

module.exports = router;       
