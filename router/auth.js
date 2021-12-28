const express = require('express');
const router = express.Router();
const user = require('../model/userSchema');
const validator = require('validator');


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

module.exports = router;
