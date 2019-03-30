var CryptoJS = require("crypto-js");
import mongoose from "mongoose"

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
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
export function hashPassword(password){
    var passwordHash = require('password-hash');
    return passwordHash.generate(password);
}

export function enc(data){
    return CryptoJS.AES.encrypt(data, 'chiakhoa');
}

export function dec(hash){
    var bytes  = CryptoJS.AES.decrypt(hash, 'chiakhoa');
    return  bytes.toString(CryptoJS.enc.Utf8);
}

