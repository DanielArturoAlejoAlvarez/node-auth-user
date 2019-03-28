'use strict'

const DB=require('../config/database')

const Schema=DB.Schema 

const { isEncryptPassword, isMatchPassword }=require('../config/encryptions')

const UserSchema=new Schema({
    fullName: String,
    slug: String,
    email: {type: String, unique: true, lowercase: true},
    username: String,
    password: String,
    avatar: String,
    role: {type: String, enum: ["ADMIN","EDITOR","USER"], default: "USER"},
    state: {type: Boolean, default: true},
    dateSignup: {type: Date, default: Date.now()},
    lastLogin: Date
})

UserSchema.methods={
    encryptPassword: isEncryptPassword,
    matchPassword: isMatchPassword
}


module.exports=DB.model('User', UserSchema)