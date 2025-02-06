const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")

// app.use(() => {

// })

app.use(express.json());

app.post('/signup', async (req, res) =>{


const user = new User(req.body);


try{

    await user.save();
    res.send("user added");
}

catch(err){
    res.send(400).send("error saving the user"+ err.message);
}

});


app.get('/user' , async(req, res) =>{
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({emailId: userEmail});
        if(users.length == 0)
        {
            res.status(404).send("user not found");
        }
        else
        {
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
});



app.get("/feed", async (req, res) =>{
     try{
           const users = await User.find({});
           res.send(users);
     }
     catch(err){
        res.status(400).send("something went wrong");
    }
})


connectDB().then(() =>{
    console.log("database connected");
    app.listen(3000, ()=>{
        console.log("listenig on port");
    });
    }).catch(err=>{
        console.error("database cannot connected")
    });





