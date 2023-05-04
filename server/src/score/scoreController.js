var Score = require("../score/score.model");
var Student = require("../user/userModel");

var addScore = async (req, res) => {
  try {
    const { semester, studentId, subjects } = req.body;   

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Không tìm thấy sinh viên.",
      });
    }

    const newScore = new Score({
      semester,
      student: student._id,
      subjects,
    });

    let totalScore = 0;
    let total_credits = 0;

    for (const subject of subjects) {
      totalScore += subject.score * subject.credits;
      total_credits += subject.credits;  
    }

    const createdScore = await newScore.save();

    const CPA = totalScore / total_credits;  
    console.log(CPA);
    await Score.findByIdAndUpdate(createdScore._id, { CPA, total_credits });
    // student.scores.push(createdScore);  

    res.status(201).json(createdScore);

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addScore,
};
