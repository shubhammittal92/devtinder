const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema =new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        minLength : 4,
    },
    lastName : {
        type : String
    },
    emailId: {
        type:String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid email");
            }
        },
    },
    password: {
        type:String,
        required: true,
    },
    age:{
        type: Number,
        min: 18,
    },

    
    gender:{
        type: String,
        enum: {
            values: ["male", "female", "others"],
            message: `{values} is not a valid gender type`
        },
        // validate(value) {
        //  if(!["male", "female", "others"].includes(value)){
        //     throw new Error("Invalid");
        //  }
        // },
    },
    photoUrl:{
        type: String,
    },
    about:{
        type: String,
        default: "this is deafult text"
    },
    skills:{
type: [String],
    },
},
{
    timestamps: true,
}

);


userSchema.methods.getJWT = async function () {
    const user = this;
  const token = await  jwt.sign({ _id :user._id }, "dev@ttinder@7789" , {
        expiresIn: "7d",
    });

    return token;
};


userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
     const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser, 
        passwordHash
    );
       return isPasswordValid;
};


const User = mongoose.model("User", userSchema);

module.exports = User;
