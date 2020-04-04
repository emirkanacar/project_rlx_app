const Users = require('../models/Users');

module.exports = (userData, permissionType, callback) => {
    Users.findOne({ username: userData.username }, (err, doc) => {
        if(err) throw err;
        let permissionAllowed = false;

        if(doc !== null) {
            if(permissionType === doc.userGroup ) {
                permissionAllowed = true;
                callback(permissionAllowed);
            }else {
                permissionAllowed = false;
                callback(permissionAllowed);
            }
        }
    })
};