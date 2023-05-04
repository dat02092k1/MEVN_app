var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',
    },
    username: {
        type: String
    },
    _class: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true 
    }, 
    status: {
        type: String,
            enum: [
                "pending",
                "accepted",
                "rejected",
              ],
            default: "pending"
      }

},
 {
    timestamps: true,
 });

module.exports = mongoose.model('requests', requestSchema);