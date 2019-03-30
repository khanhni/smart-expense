const mongoose = require("mongoose");
// const {hashPassword,enc,dec} = require("../models/userModel");
// const {UserSchema} = require("../models/userModel");
// // import {UserSchema} from "../models/userModel"
// const Users = mongoose.model('User',UserSchema);
var CryptoJS = require("crypto-js");
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
        type:String,
        required:'Enter income'
    },
    saving:{
        type:Number,
        required:'Enter saving amount,20% by default'
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

function enc(data){
    return CryptoJS.AES.encrypt(data, 'chiakhoa');
}

function dec(hash){
    var bytes  = CryptoJS.AES.decrypt(hash, 'chiakhoa');
    return  bytes.toString(CryptoJS.enc.Utf8);
}
// module.exports = {UserSchema};
// module.exports = hashPassword;
// module.exports = enc;
// module.exports = dec;


const User = mongoose.model('User',UserSchema);

exports.signUp = (req,res)=>{
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
exports.logIn =(req,res)=>{
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



