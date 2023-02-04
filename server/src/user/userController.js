var userService = require('./userService');     
  


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

module.exports = { getDataControllerfn, createUserControllerFn, updateUserControllerFn, deleteUserControllerFn } ; 