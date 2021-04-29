const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
let EmpModel = require("../models/employee.model.js");

var { RaiseTicket } = require('../models/employee');

// => localhost:9090/RaiseTicket/
router.get('/', (req, res) => {
    RaiseTicket.find((err, docs) => {
        console.log(docs);
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Raiseticket requests :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    debugger;
    console.log(req.body);
    var emp = new RaiseTicket({
        UserEmail: req.body.UserEmail,
        Reason: req.body.Reason,
       
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Request  Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        UserEmail: req.body.UserEmail,
        Reason: req.body.Reason,
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

/** 
let deleteEmpById= (req,res)=> {
    let empId = req.params.empId;
    EmpModel.deleteOne({_id:empId},(err,result)=> {
        if(!err){
                if(result.deletedCount>0){
                    res.send("Record deleted successfully")
                }else {
                    res.send("Record not present");
                }
        }else {
            res.send("Error generated "+err);
        }
    })
}**/

module.exports = router;