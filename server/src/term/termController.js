var termModel = require('./termModel'); 
var Student = require('../user/userModel'); 
var Course = require('../course/courseModel'); 

var addTerm = async (req, res) => {
    try {
        const student = await Student.findOne({address: req.body.address});

        console.log(student)
        const term = req.body.term;

        const newTerm = await new termModel({
            term: term,
            user: student._id,
        });
     
        await newTerm.save();
 
        res.send({
            message: "Added Term",
            newTerm
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

var getTerm = async (req, res) => {
    try {

        const id = req.params.termId;

        const term = await termModel.find( { _id: id } );

        if (!term) console.log('error');
 
        res.send({
            message: "this term",
            term
        }); 
    } catch (error) {
        res.status(400).send(error);
    }
}

var addGrade = async (req, res) => {
    try {
        const student = await Student.findOne({email: req.body.address});

        if(!student) return res.status(400).send('Email Is Not Exist');

        const term = await termModel.findOne({
            term: req.body.term,
            user: student._id,
        });

        console.log(student, term);

        const course = await Course.findOne({ term: term._id, user: student._id }); 
pa

    } catch (error) {
        res.status(400).send(error);
    }
}
module.exports = {
    addTerm, getTerm, addGrade
}
