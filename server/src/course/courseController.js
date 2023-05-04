var courseModel = require('./courseModel'); 
var Student = require('../user/userModel'); 
var Term = require('../term/termModel'); 

var addCourse = async (req, res) => {
    try {
        const student = await Student.findOne({address: req.body.address});
        console.log(student);
        const term = await Term.findOne({
            term: req.body.term, 
            user: student._id            
        });
         
        if (!term) console.log('term not found') 

        const courses = req.body.courses;     

        const newCourse = await new courseModel({
            courses: courses,
            user: student._id,
            term: term._id
        });

        await newCourse.save();

        // Get Object Subject From Array Subjects
        const arrSubjects = newCourse.courses;
        // Create Array To Push her Subjects
        console.log(arrSubjects);
        let allCourses = [];
        arrSubjects.forEach(courses => {
             
            allCourses.push(courses)
        });
        // Convert Array Subjects To String To Push In Student And Level Model 
        console.log(allCourses);  
        allCourses.forEach(course => {
             
            student.courses.push(course.toString())
        });                 
         
        console.log(student.courses);
        await student.save();
        term.courses.push(allCourses.toString());
        await term.save();
        res.send({
            message: 'Done Added Subjects',
            student,
            term
        });
    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = {
    addCourse
}
