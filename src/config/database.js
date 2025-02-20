const mongoose  = require('mongoose');


const connectDB = async () =>{
    await mongoose.connect(
        //    "mongodb+srv://shubmittal74:DuOdRfVxLbMoYsDw@namastenode.tf77d.mongodb.net/webtinder"
           "mongodb+srv://shubham:shub7600@namastenode.tknna.mongodb.net/?retryWrites=true&w=majority&appName=namastenode/xyz"
    )
};

module.exports = connectDB;

// connectDB().then(() =>{
// console.log("database connected") 
// }).catch(err=>{
//     console.error("database cannot connected")
// });