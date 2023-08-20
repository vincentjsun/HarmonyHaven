const express = require('express');
const collection = require("./models/user.js");
const cors = require("cors");
const app = express();
const PORT = 8000;
const { Storage } = require('@google-cloud/storage');
const Multer = require("multer");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/login", cors(),async(req,res)=>{
    const{email,password} = req.body
    console.log(password);
    try {
        const check=await collection.findOne({email:email});
        if(check){
            res.json("exist");
        }
        else{
            res.json("not exist");
        }
    }
    catch(err){res.json("not exist")};
});  

app.post("/signup", cors(),async(req,res)=>{
    const{email,password} = req.body
    console.log(email);
    const data={
        email:email,
        password:password
    }
    try {
        const check=await collection.findOne({email:email});
        if(check){
            res.json("exist");
        }
        else{
            res.json("not exist");
            await collection.insertMany([data]);
        }
    }
    catch(err){res.json("not exist")};
});  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

//mongodb+srv://vincentjsun:<password>@karaokedb.hptn0cd.mongodb.net/?retryWrites=true&w=majority