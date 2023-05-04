var userService = require('./userService');     
var User = require('./userModel');     



var getDataControllerfn = async (req, res) => {
    try {
        var emp = await userService.getDataFromDBService();
    res.send({ "status": true,
                "data": emp    
}); 
    } catch (error) {
        console.log(error);
    }
}

var createUserControllerFn = async (req, res) => 
{
    try {
        var status = await userService.createUserDBService(req.body);
    if (status) {
        res.send({ "status": true, "message": "User created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating user" });
    }
    } catch (error) {
        console.log(error);
    }
}

var updateUserControllerFn = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);

        var result = await userService.updateUserDbService(req.params.id, req.body);

        if (result) {
            res.send({
                "status": true, "message": "user updated"
            }); 
        }
        else {
            res.send(
                {"status": false, "message": "updated failed"}
            )
        }
    } catch (error) {
        console.log(error); 
    }
}

var deleteUserControllerFn = async (req, res) => {
    try {
        console.log(req.params.id);
        var result = await userService.deleteUserDbService(req.params.id); 

        if (result) {
            res.send({
                "status": true, "message": "user deleted"
            }); 
        }
        else {
            res.send(
                {"status": false, "message": "delete failed"}
            )
        }
    } catch (error) {
        console.log(error);
    }
}

var loginController = async (req, res) => {
    try {
        const { address, password } = req.body;   
        console.log(address);
        const student = await User.find({ address: address, password: password });
        console.log(student);
        if (!student) {
            return res.status(404).json({
                message: "Không tìm thấy sinh viên.",
              });
        }

        res.status(200).json(student);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getDataControllerfn, createUserControllerFn, 
    updateUserControllerFn, deleteUserControllerFn,
    loginController } ; 