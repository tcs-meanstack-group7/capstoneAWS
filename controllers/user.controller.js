const jwt = require('jwt-simple');
const config = require('../config/app');
const userModel = require('../models/user.model');
let mongoose = require("mongoose");


const User = require('../models/user.model');
const validationHandler = require('../validations/validationHandler')

exports.funds = async (req, res, next) => {
    try{

        const id = req.params.id;
        const user = await User.findOne({_id:id});
        console.log(user)
        if (!user){
            const error = new Error("No User Found");
            error.statusCode = 401;
            throw error;
        }
        let funds = user.funds;
        res.send({funds});
    }catch(err){
        next(err);
    }
}
exports.spend = async (req, res, next) => {
    try{
        const id = req.body.id;
        const user = await User.findOne({_id:id});
        console.log(user)
        if (!user){
            const error = new Error("No User Found");
            error.statusCode = 401;
            throw error;
        }
        newFunds = parseInt(user.funds)-parseInt(req.body.amount)
        userModel.findOneAndUpdate({_id:id},{$set:{funds:newFunds}},(err,result)=> {
            if(!err){  
                res.send({"Response":"Record updated succesfully"})
            }else {
                res.send("Error generated "+err);
            }
        })
    }catch(err){
        next(err);
    }
}

exports.addFunds = async (req, res, next) => {
    try{

        const id = req.body.id;
        const amountToAdd = parseInt(req.body.add);
        const accountNumber = req.body.accountNumber;

        const user = await User.findOne({_id:id});
        if (!user){
            const error = new Error("No User Found");
            error.statusCode = 401;
            throw error;
        }
        if (accountNumber != user.bankAccountNumber) {
            const error = new Error("Invalid Bank Account");
            error.statusCode = 401;
            throw error;
        }
        if (amountToAdd > user.bankBalance) {
            const error = new Error("Insufficient Bank Balance");
            error.statusCode = 401;
            throw error;
        }
        const newFunds = user.funds+amountToAdd;
        const newBalance = user.bankBalance-amountToAdd;

        userModel.findOneAndUpdate({_id:id},{$set:{funds:newFunds,bankBalance:newBalance}},(err,result)=> {
            if(!err){  
                res.send({"Response":"Record updated succesfully"})
            }else {
                res.send("Error generated "+err);
            }
        })
    }catch(err){
        next(err);
    }
}


exports.edit = async (req, res, next) => {
    try{
        let usr = new User();
        const id = req.body.id;
        let newEmail = req.body.email;
        let newPassword = await usr.encryptPassword(req.body.password);
        let newFName = req.body.fname;
        let newLName = req.body.lname;
        let newDob = req.body.dob;
        let newPNumber = req.body.pnumber;
        let newAddress = req.body.address;

        const user = await User.findOne({_id:id});
        if (!user){
            const error = new Error("No User Found");
            error.statusCode = 401;
            throw error;
        }
        console.log(user)
        let newValues = {email:newEmail,password:newPassword,fname:newFName,lname:newLName,dob:newDob,pnumber:newPNumber,address:newAddress}
        console.log(newValues)
        userModel.findOneAndUpdate({_id:id},{$set:newValues},(err,result)=> {
            if(!err){
                res.send({"Response":"Record updated succesfully"})
            }else {
                res.send("Error generated "+err);
            }
        })
        
    }catch(err){
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        console.log(email)
        const user = await User.findOne({email}).select("+password");
        if (!user){
            const error = new Error("Wrong Credentials");
            error.statusCode = 401;
            throw error;
        }
        if (user.isLocked){
            const error = new Error("Too Many Unsuccessful Logins Please Raise Ticket");
            error.statusCode = 401;
            throw error;
        }
        const validPassword = await user.validPassword(password);
        if (!validPassword) {
            console.log(user.consecutiveFailed)
            unsuccessful = parseInt(user.consecutiveFailed) + 1;
            if (unsuccessful >= 3 ){
                locked = true;
            }
            else {
                locked = false;
            }
            
            console.log(unsuccessful)
            console.log(locked)
            userModel.findOneAndUpdate({email:user.email},{$set:{consecutiveFailed:unsuccessful,isLocked:locked}},(err,result)=> {
                if(!err){
                }else {
                }
            })
            const error = new Error("Wrong Credentials");
            error.statusCode = 401;
            throw error;
        }
        userModel.findOneAndUpdate({email:user.email},{$set:{consecutiveFailed:0}},(err,result)=> {
            if(!err){
            }else {
            }
        })
        const token = jwt.encode({id:user.id}, config.jwtSecret);
        return res.send({user, token});
    }catch(err){
        next(err);
    }
}



exports.signup = async (req,res,next) =>{
    try{
        validationHandler(req);
        const existingUser = await User.findOne({email: req.body.email});
        if (existingUser){
            const error = new Error("Email already used");
            error.statusCode = 401;
            throw error;
        }
        let user = new User();
        user.email = req.body.email;
        user.password = await user.encryptPassword(req.body.password);
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.dob = req.body.dob;
        user.pnumber = req.body.pnumber;
        user.address = req.body.address;
        user.cart = [];
        user.funds = 0; 
        user.bankBalance = 10000;
        user.bankAccountNumber = 12345;
        user.isLocked = false;
        user.consecutiveFailed = 0;
        user = await user.save();

        const token = jwt.encode({id: user.id}, config.jwtSecret);
        return res.send({user, token});
    } catch(err){
        next(err);
    }
}