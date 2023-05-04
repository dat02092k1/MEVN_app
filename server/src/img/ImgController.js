const { cloudinary } = require("../../server.js");

var uploadImgController = async (req, res) => {
    try {
         // collected image from a user
        const data = {
        image: req.body.image,
    };

    cloudinary.uploader.upload(data.image)
    .then((result) => {
        res.status(200).send({
          message: "success",
          result,
        });
      }).catch((error) => {
        res.status(500).send({
          message: "failure",
          error,
        });
      });
    } catch (error) {
        console.log(error);
    }
}

var getImgController = async (req, res) => {
    try {
        res.json({ message: "Hey! This is your server response!" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { uploadImgController, getImgController } ; 