const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")

app.post('/signup', async (req, res) =>{


const user = new User({
    firstName: 'John',
    lastName: 'Doe',
    emailId : "sh@gmail.com",
    password: "aks@123"
});


try{

    await user.save();
    res.send("user added");
}

catch(err){
    res.send(400).send("error saving the user"+ err.message);
}

});


connectDB().then(() =>{
    console.log("database connected");
    app.listen(3000, ()=>{
        console.log("listenig on port");
    });
    }).catch(err=>{
        console.error("database cannot connected")
    });





