var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userId: {
        type: String,
    },
    name: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
     },
    role: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,   
    },
    scores: [{
        type: Schema.Types.ObjectId,
        ref: 'scores'
      }]
    
    // term: [{
    //     type: Number,
    //     ref: 'terms'
    // }],
    // courses: [{
    //     type: String,
    //     ref: 'courses'
    // }],
    // term_id: {
    //     type: String
    // },
    // degrees: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // }

});

module.exports = mongoose.model('employees', userSchema);