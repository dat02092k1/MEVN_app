const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema(
    {
        members: {
            type: Array,
        }
    },
    { 
        timestamps: true 
    }
)

conversationSchema.index({ members: 1 });

module.exports = mongoose.model("conversations", conversationSchema);