const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, {}).then(() =>{
    console.log('db connected');

}).catch(err => console.log("err.message"));
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const collection = mongoose.model("collection", userSchema);

module.exports=collection