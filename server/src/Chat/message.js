const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'conversations'
          },      
       sender: {
        type: String
       },
       content: {
        type: String
       }
    },
    { 
        timestamps: true 
    }
)

module.exports = mongoose.model("messages", messageSchema);