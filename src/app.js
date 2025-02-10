const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

const {userAuth}      = require("./middlewares/auth")

app.use(express.json());
app.use(cookieParser());

// Signup Route
app.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        await user.save();
        res.status(201).send("User added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

// Login Route
app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!emailId || !password) {
            return res.status(400).send("Invalid crendials");
        }

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            return res.status(404).send("Invalid crendials");
        }

        const isPasswordValid = await user.validatePassword(password);
        // if (!isPasswordValid) {
        //     return res.status(401).send("Invalid crendials");
        // }
        if(isPasswordValid)

            {
                const token = await user.getJWT();
                // console.log(token);
                res.cookie("token", token);
                res.send("login succ");
            }
else
{
    throw new Error("invlaid crendials");
}
    } catch (err) {
        res.status(500).send("Error during login: " + err.message);
    }
});



app.get("/profile", userAuth , async(req,res) => {
    try{
  
   const user = req.user;

   res.send(user);
    }
    catch (err) {
        res.status(500).send("Error during login: " + err.message);
    }
}); 

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    console.log("sending a connection request");


    res.send(user.firstName + "connection request send");
});


// Connect to Database and Start Server
connectDB().then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
}).catch(err => {
    console.error("Database connection failed:", err.message);
});