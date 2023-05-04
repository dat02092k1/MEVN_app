var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true 
    }, 
    imageUrl: {
        type: Array, 
    }

},
 {
    timestamps: true,
 });

module.exports = mongoose.model('posts', postSchema);