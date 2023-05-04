var Conversation = require("../Chat/conversation");
var Message = require("../Chat/message");

var getCv = async (req, res) => {
    const { user } = req.params;
    try {
        const conversations = await Conversation.aggregate([
            { $match: { members: user } },
            {
                $lookup: {
                    from: "messages",
                    localField: "_id",
                    foreignField: "conversationId",
                    as: "messages"
                }
            },
            {
                $addFields: {
                    latestMessage: { $max: "$messages.createdAt" }
                }
            },
            {
                $sort: { latestMessage: -1 }
            }
        ], function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
  
      // Send the sorted conversations as the response
      res.status(200).send(conversations);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
};

const sendMsg = async (req, res) => {
    try {
          const newMessage = new Message(req.body);
    
          await newMessage.save();

          res.status(200).send(newMessage);
    } catch (error) {
        console.log(error);
    }
}

const handleCv = async (req, res) => {
    try {
        const checkConversation = await Conversation.findOne({
            members: { $all: [req.body.sender, req.body.receiver] },
          });
          console.log(checkConversation);
      
          if (checkConversation) {
            res.status(200).send({ message: checkConversation });;
          } else {
            const newConversation = new Conversation({
              members: [req.body.sender, req.body.receiver],             
            });
      
            await newConversation.save();
      
            res.status(200).send({ message: newConversation });
          }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCv, handleCv,
    sendMsg
};
