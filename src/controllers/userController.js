const mongoose = require("mongoose");
// const {hashPassword,enc,dec} = require("../models/userModel");
// const {UserSchema} = require("../models/userModel");
// // import {UserSchema} from "../models/userModel"
// const Users = mongoose.model('User',UserSchema);
// var CryptoJS = require("crypto-js");
// const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName:{
        type:String,
        required:'Enter username'
    },
    passWord:{
        type:String,
        required:'Enter password'
    },
    income:{
        type:Number,
        required:'Enter income'
    },
    saving:{
        type:Number,
        required:'Enter saving amount,20% by default'
    },
    address:{
        type:String,
        required:'Enter address'
    },
    phone:{
        type:String,
        required:'Enter phone number'
    },
    expenseIDlist:{
        type:[],
        required:'Enter list of catagories id'
    },
    created_date:{
        type:Date,
        default:Date.now
    }
});

const ExpenseSchema = new Schema({
    foodOdrink:{
        type:Number,
        required:'Enter food or drink expensed'
    },
    transportation:{
        type:Number,
        required:'Enter transportation expensed'
    },
    shopping:{
        type:Number,
        required:'Enter shopping expensed'
    },
    total:{
        type:Number,
        required:'Enter total expensed'
    },
    userId:{
        type:String,
        required:'Enter userID'
    },
    created_date:{
        type:Date,
        default:Date.now
    }
});

// export function hashPassword(password){
//     try {
//         const salt = bcrypt.genSalt(10)
//         return bcrypt.hash(password, salt)
//       } catch(error) {
//         throw new Error('Hashing failed', error)
//       }
// }
// module.exports.hashPassword = async (password) => {
//     try {
//       const salt = await bcrypt.genSalt(10)
//       return await bcrypt.hash(password, salt)
//     } catch(error) {
//       throw new Error('Hashing failed', error)
//     }
//   }
function hashPassword(password){
    var passwordHash = require('password-hash');
    return passwordHash.generate(password);
}

// function enc(data){
//     return CryptoJS.AES.encrypt(data, 'chiakhoa');
// }

// function dec(hash){
//     var bytes  = CryptoJS.AES.decrypt(hash, 'chiakhoa');
//     return  bytes.toString(CryptoJS.enc.Utf8);
// }
// module.exports = {UserSchema};
// module.exports = hashPassword;
// module.exports = enc;
// module.exports = dec;


const User = mongoose.model('User',UserSchema);
const Expense = mongoose.model('Expense',ExpenseSchema)

exports.signUp = (req,res)=>{
    req.body.passWord = hashPassword(req.body.passWord);
    // req.body.income = enc(req.body.income);
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
exports.logIn =(req,res)=>{
    var passwordHash = require('password-hash');
    let checkUser = new User(req.body);
    User.findOne({'userName':`${req.body.userName}`},(err,usr)=>{
        if(usr==null){
            res.json({'message':'Invalid, please try again'});
        }
        else if(passwordHash.verify(req.body.passWord,usr.passWord)){
            // usr.income = dec(usr.income);
            res.json(usr);
        }
    //     else if(!usr){
    //     res.json({'message':'Invalid, please try again'});
    // }
    })
};

exports.updateProfile=(req,res)=>{
    // req.body.income = enc(req.body.income);
    req.body.passWord = hashPassword(req.body.passWord);
    User.findOneAndUpdate({_id: req.params.userId},req.body,{new:true },(err,usr)=>{    
        if(err){
            res.send(err);
        }
        else if(req.body.saving<20){
        res.json({'message':'The saving cannot be less than 20%, please enter again !!'});
        }
        else{
        // usr.income=dec(usr.income)
        res.json(usr);
        }
    }
    );
}

exports.createExpense=(req,res)=>{
    let newExpense = new Expense(req.body);
    // User.update({_id:`${req.body.userId}`},{ $push: {expenseIDlist:["sdad"]}});
    newExpense.save((err,exp)=>{
        if(err){
            res.send(err);
        }
        else{
           res.json(exp);
        }
    })
};



