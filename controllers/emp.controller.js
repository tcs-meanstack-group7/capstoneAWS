const jwt = require('jwt-simple');
const config = require('../config/app');

let empData = require('../models/reports.model');
const Emp = require('../models/employee.model');
const validationHandler = require('../validations/validationHandler');
const userModel = require('../models/user.model');
var { RaiseTicket } = require('../models/employee');
var { Request } = require('../models/admin');


exports.login = async(req, res, next) => {
    try {
        const empId = req.body.empId;
        const password = req.body.password;
        const emp = await Emp.findOne({ empId }).select("+password");
        console.log(emp)
        if (!emp) {
            const error = new Error("Wrong Credentials");
            error.statusCode = 401;
            throw error;
        }
        const validPassword = await emp.validPassword(password);
        if (!validPassword) {
            const error = new Error("Wrong Credentials");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.encode({ id: emp.id }, config.jwtSecret);
        return res.send({ emp, token });
    } catch (err) {
        next(err);
    }
}

exports.signup = async(req, res, next) => {
    try {
        validationHandler(req);
        const existingUser = await Emp.findOne({ empId: req.body.empId });
        if (existingUser) {
            const error = new Error("ID already used");
            error.statusCode = 403;
            throw error;
        }
        let emp = new Emp();
        emp.empId = req.body.empId;
        emp.password = await emp.encryptPassword(req.body.password);
        emp = await emp.save();

        const token = jwt.encode({ id: emp.id }, config.jwtSecret);
        return res.send({ emp, token });
    } catch (err) {
        next(err);
    }
}
exports.sendrequest = async(req, res) => {

    let request = new empData({
        productName: req.body.productName,
        quantity: req.body.quantity
    });



    request.save((err, result) => {
        if (!err) {
            res.send("Record stored successfully ")
        } else {
            res.send("Record didn't store " + err);
        }
    })

}
// Admin review request
exports.reviewRequest = async(req, res) => {
    Request.find({},(err,result)=>{
        if(!err){
            res.json(result);
        }
    })
}
exports.editProfile = async(req, res) => {
    let emp = new userModel();
    let email = req.body.email;
    let updatedPass = await emp.encryptPassword(req.body.password);

    userModel.updateOne({ email: email }, { $set: { password: updatedPass } }, (err, result) => {
        if (!err) {
            if (result.nModified > 0) {
                res.send({"Response":"Record updated succesfully"})
            } else {
                res.send("Record is not available");
            }
        } else {
            res.send("Error generated " + err);
        }
    })
}

exports.unlock = async(req, res) => {
    let user = new userModel();
    let newPassword = await user.encryptPassword("NewPassword")

    userModel.updateOne({ email: req.body.email }, { $set: { password: newPassword, isLocked: false, consecutiveFailed: 0 } }, (err, result) => {
        if (!err) {
            if (result.nModified > 0) {
                res.send({"Response":"Record updated succesfully"})
            } else {
                res.send("Record is not available");
            }
        } else {
            res.send("Error generated " + err);
        }
    })
}

exports.deleteEmpById = async(req, res) => {
    let id = req.params.empId;
    Emp.deleteOne({ empId: id }, (err, result) => {
        if (!err) {
            if (result.deletedCount > 0) {
                res.send({"Response":"Employee deleted successfully"});
            } else {
                res.send("Record not present");
            }
        } else {
            res.send("Error generated " + err);
        }
    });
}
exports.viewTickets = async(req, res) => {
    RaiseTicket.find((err, data) => {
        if (!err) {
            res.json(data);
        }
    })
}

exports.deleteTickets = async(req, res) => {
    
    let email = req.params.email;
    console.log(email)
    RaiseTicket.deleteMany({UserEmail:{$eq : req.params.email}} , (err, data) => {
        if (!err) {
            res.json(data);
        }
    })
}