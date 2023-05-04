var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    title: {
        type: String,
    },
    task: {
        type: String,
        required: true 
    },
    assignedStudents: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'employees',
            required: true
        }, 
        isCompleted: {
            type: Boolean,
            default: false
        }
      }],  
    // class                      
    duration: {
        type: Date,
    required: true
    }
});

module.exports = mongoose.model('tasks', taskSchema);       