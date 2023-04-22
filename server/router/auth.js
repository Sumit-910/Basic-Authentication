const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const cookieParser = require("cookie-parser");
router.use(cookieParser());

require('../db/conn');
const User = require('../model/userSchema');

router.get('/',(req,res)=>{
    res.send("home router");
});

//todo using promises
// router.post('/register', (req,res)=>{
//     const {name,email,phone,work,password,cpassword} = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error: "Please fill all the fields!"});
//     }

//     User.findOne({email}).then((e)=>{
//         if(e){return res.status(422).json({error: "Email already exists!"})}
    

//     const user = new User({name,email,phone,work,password,cpassword});

//     user.save().then(()=>{
//         res.status(201).json({message: "user registered successfully"})
//     }).catch((err)=>{return res.status(500).json({error: "Failed to register"})})
//     }).catch(err=>console.log(err))
// });

//todo using async await
router.post('/register', async (req,res)=>{
    const {name,email,phone,work,password,cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "Please fill all the fields!"});
    }

    try {
        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(422).json({error: "Email already exists!"})
        }
        if(password!==cpassword){
            return res.status(422).json({error: "passwords are not matching"});
        }
        else{
            const user = new User({name,email,phone,work,password,cpassword});

            await user.save();
            res.status(201).json({message: "user registered successfully"})
        }
        
        
        
    } catch (err) {
        return console.log(err);
    }
});

router.post("/signin", async (req,res)=>{

    try {
        const {email,password} = req.body;

        if(!email || !password){
        return res.status(400).json({error: "Please enter the details."});
        }
        
        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(400).json({error: "Invalid details"});
        }

        const isMatch = await bcrypt.compare(password,userExist.password)
        if(!isMatch){
            return res.status(400).json({error: "Invalid details"});
        }

        const token = await userExist.generateAuthToken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        })

        res.json({message: "user logged in successfully"});
        
    } catch (err) {
        return console.log(err);
    }
})

router.get('/about', authenticate, (req,res)=>{
    res.send(req.rootUser);
});

router.get('/getdata', authenticate, (req,res)=>{
    res.send(req.rootUser);
})

router.post('/contact', authenticate, async(req,res)=>{
    try {
        const {name,email,phone,msg}=req.body;

        if(!name || !email || !phone || !msg){
            console.log("error in contact form");
            return res.json({error: "please fill the contact form"})
        }

        const userContact = await User.findOne({_id: req.userID});

        if(userContact){
            const userMessage = await userContact.addMessage(name, email, phone, msg);

            await userContact.save();

            res.status(201).json({message: "user contact successfully"});
        }

    } catch (err) {
        console.log(err);
    }
});

router.get('/logout', (req,res)=>{
    res.clearCookie('jwt',{path: '/'});
    res.status(200).send("user logged out");
});

module.exports = router;