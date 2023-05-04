const Score = require('../score/score.model');
const GPA = require('../score/gpa.model');
const Student = require('../user/userModel');

const calculate = async (req, res) => {
  try {
    const studentId = req.params.id;

    const scores = await Score.find({ student: studentId });

    let totalScore = 0;
    let totalCredits = 0;

    scores.forEach(score => {
      let scoreTotal = 0;
      let numSubjects = 0;

      score.subjects.forEach(subject => {
        scoreTotal += subject.score;
        numSubjects++;
      });

      const scoreAverage = scoreTotal / numSubjects;
      const credits = 3; // assume 3 credits per subject
      const weightedScore = scoreAverage * credits;

      totalScore += weightedScore;
      totalCredits += credits;
    });

    const gpa = totalScore / totalCredits;

    const existingGPA = await GPA.findOne({ student: studentId });

    if (existingGPA) {
      existingGPA.gpa = gpa;
      await existingGPA.save();
    } else {
      const newGPA = new GPA({ student: studentId, gpa });
      await newGPA.save();
    }

    res.status(200).json({ gpa });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


var getGPA = async (req, res) => {
    try {
        const studentId  = req.params.id;
                   
    const student = await Student.findById(studentId);

    if (!student) {
        return res.status(404).json({
          message: "Không tìm thấy sinh viên.",
        });
      }
             
      
    const result = await Score.aggregate([
        { $match: { student: student._id } },
        {
            $group: {
                _id: null,
                totalScore: { $sum: { $multiply: ["$CPA", "$total_credits"] } },
                totalCredits: { $sum: "$total_credits" },
              },
        },
        {
            $project: {    
                _id: 0,
                GPA: { $divide: ["$totalScore", "$totalCredits"] },
              },
      
        }
    ]);

     

    if (result.length > 0) {
        const gpa = result[0].GPA;
        res.json({ GPA: gpa });
      } else {
        res.json({ GPA: 0 });             
      }

    } catch (error) {
        console.log(error); 
    }
}

var calculateGPA = async (req, res) => {
    try {
        const studentId  = req.params.id;
                   
    const student = await Student.findById(studentId);

    if (!student) {
        return res.status(404).json({
          message: "Không tìm thấy sinh viên.",
        });
      }

      const result = await Score.aggregate([
        { $match: { student: student._id } },
        {
            $group: {
                _id: null,
                totalScore: { $sum: { $multiply: ["$CPA", "$total_credits"] } },
                totalCredits: { $sum: "$total_credits" },
              },
        },
        {
            $project: {    
                _id: 0,
                GPA: { $divide: ["$totalScore", "$totalCredits"] },
              },
      
        }
    ]);

    const gpaValue = result[0].GPA;

    const status =
      gpaValue < 3.0
        ? "Cảnh báo học vụ"
        : gpaValue > 3.2
        ? "Khen thưởng"
        : "Không";
                                                     
    const newGPA = new GPA({
        student: studentId,
        gpa: gpaValue,
        status: status,
      });
    
    await newGPA.save();

    res.status(200).json({
        message: "Tính GPA thành công",
        newGPA
      });
  
    } catch (error) {
        console.log(error);   
    }
}

var getScore = async (req, res) => {
    try {
        const studentId  = req.params.id;
                   
    const student = await Student.findById(studentId);

    if (!student) {
        return res.status(404).json({
          message: "Không tìm thấy sinh viên.",
        });
      }

    const gpa = await GPA.find({ student: student._id}); 

    if (!gpa) console.log('cant find gpa');
    console.log(gpa);  

    res.status(200).json({ GPA: gpa });
    } catch (error) {
        console.log(error);
    }
}
module.exports = { calculateGPA, getGPA, getScore  };
