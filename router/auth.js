const express = require('express');
const router = express.Router();
const user = require('../model/userSchema');
const validator = require('validator');
const bcrypt = require("bcryptjs");


//REGISTRATION PART

router.post('/Signup',async(req,res)=>{
    const {name,email,password,cpassword} = req.body;
    if(!name|| !email|| !password|| !cpassword){
        return res.status(422).json({error:"please fill all the details"});
    }
    if(!validator.isEmail(email)){
        return res.status(422).json({error:"please enter a valid email id"});
    }

        try
        {
            const userExsit= await user.findOne({email:email});
            if(userExsit)
            {
                 return res.status(422).json({error:"Email Already Exists"});
            }else if(password != cpassword){
                return res.status(422).json({error:"passwords are not matching"});
            }else{
                const users = new user({name,email,password,cpassword} );
                const userReg = await users.save();
                if(userReg)
                {
                res.status(201).json({message:"user registered successfully"});
                }
                else
                {
                    res.status(500).json({error:"server problem"});
                }
            } 
    }catch(err)
    {
        console.log(err);
    }

});

//Login PART
router.post("/login",async(req,res)=>{
    try {
        // let token;
        const {email,password} = req.body;
        if(!email || !password){
               return res.status(400).json({error:"plz fill the data"}); 
        }
         
        const userLogin = await user.findOne({email:email});
        if(!userLogin)
        {
            res.status(400).json({error:"Invalid Credientials"});    
        }
        else
        {
           const isMatch = await bcrypt.compare(password,userLogin.password);
            // token = await userLogin.generateAuthToken();
        //    console.log(token);
            
          console.log(isMatch)
                if(isMatch){
                    res.status(200).json({message:"Valid Credientials"});
                } else{
                    res.status(400).json({error:"Invalid Credientials"});  
                }
           
        }

    } catch (error) {
        console.log(error);
    }
});



module.exports = router;
