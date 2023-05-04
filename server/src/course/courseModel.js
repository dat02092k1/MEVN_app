var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({

    courses: {
        type: Array,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees'
    },
    term: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'terms'
    }

});

module.exports = mongoose.model('courses', courseSchema);