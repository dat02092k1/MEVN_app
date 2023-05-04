var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreSchema = new Schema({

    semester: {
        type: String,
        required: true              
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees'
    },
    subjects: [{
        name: {
          type: String,
          required: true
        },
        score: {
          type: Number,
          required: true
        },
        credits: {
            type: Number,
            required: true   
        }
      }],  
    CPA: {
        type: Number,
        default: 0
      },
      total_credits: {            
        type: Number,
        default: 0
      },
    

});

module.exports = mongoose.model('scores', scoreSchema);