const validator = require('validator');

const validateSignUpData =  (req) => {
    const {firstName, lastName, emailId, password} = req.body;
      

    if(!firstName || !lastName )
        throw new Error("pls enter name");

else if(!validator.isEmail(emailId))
    throw new Error("pls enter correct email");

else if(!validator.isStrongPassword(password))
    throw new Error("pls enter strong password");


};

module.exports ={
    validateSignUpData,
}