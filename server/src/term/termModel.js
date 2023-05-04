var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var termSchema = new Schema({

    term: {
        type: String,
        required: true              
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees'
    },
    courses:  [{
        type: String,
        ref: 'courses'
    }],
    degrees: {
        type: Number,
        required: true,
        default: 0
    },      
    start_date: {
        type: Date,
         
    },
    start_date: {
        type: Date,
         
    }

});

module.exports = mongoose.model('terms', termSchema);