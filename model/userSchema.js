const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        reqiured:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    tokens:{
        type:String,
        required:true
        }
});
//hashing the password
userSchema.pre('save', async function(){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
})

//generating the token 

userSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id},process.env.SECRETKEY);
        this.tokens = token
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const user = mongoose.model('user',userSchema);
module.exports = user;