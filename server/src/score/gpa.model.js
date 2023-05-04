const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gpaSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employees'
  },
  gpa: { 
    type: Number,
    default: 0
  },
  status: {
    type: String,
        enum: [
            "Không",
            "Cảnh báo học vụ",
            "Thiếu tín chỉ",
            "Thiếu học phí",
            "Khen thưởng"
          ],
        default: "Không"
  }
});

module.exports = mongoose.model('GPA', gpaSchema);
