var userModel = require('./userModel'); 

module.exports.getDataFromDBService = async () => {
    try {
      const users = await userModel.find().sort({ start_date: -1 });

      const dates = users.map((element) => {
        return element.start_date;
    })
        
      return dates; 
    } catch (error) {
        throw error;
    }
}

module.exports.createUserDBService = (userDetails) => {


    return new Promise(function myFn(resolve, reject) {
 
        var userModelData = new userModel();
 
        userModelData.name = userDetails.name;
        userModelData.address = userDetails.address;
        userModelData.password = userDetails.password;
        userModelData.role = userDetails.role;

        userModelData.save(function resultHandle(error, result) {
 
            if (error) {
                reject(false);
            } else {
                resolve(true);
            }
        });
 
    });
 
 }

module.exports.updateUserDbService = (userId, userDetails) => {
    console.log(userDetails);
    return new Promise((resolve, reject) => {
        userModel.findByIdAndUpdate(userId, userDetails, (err, data) => 
        {
            if (err) reject(false);
            else resolve(data); 
        })
    })
}

module.exports.deleteUserDbService = (userId) => {
    console.log(userId);
    return new Promise((resolve, reject) => {
        userModel.findByIdAndDelete(userId, (err, data) => 
        {
            if (err) reject(false);
            else resolve(data); 
        })
    })
}