const mongoose = require("mongoose");
const {UserSchema,hashPassword,enc,dec} = require('../models/userModel');

const User = mongoose.model('User', UserSchema);


const signUp = (req,res)=>{
    req.body.passWord = hashPassword(req.body.passWord);
    req.body.income = enc(req.body.income);
    let newUser = new User(req.body);
    User.findOne({'userName':`${req.body.userName}`},(err,usr)=>{
        if(usr){
            res.json({'message':'Username exsit, please enter other one'})
        }else(
            newUser.save((err,user)=>{
                if(err){
                    res.send(err);
                }
                else{
                res.json({'message':'Signup successfull!!'});
                }
            })
        )
    })
};
const logIn =(req,res)=>{
    var passwordHash = require('password-hash');
    let checkUser = new User(req.body);
    User.findOne({'userName':`${req.body.userName}`},(err,usr)=>{
        if(passwordHash.verify(req.body.passWord,usr.passWord)){
            usr.income = dec(usr.income);
            res.json(usr);
        }
        else{
        res.json({'message':'Invalid, please try again'});
    }
    })
};
module.exports = signUp;
module.exports = logIn;
module.exports = User;


