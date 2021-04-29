const mongoose = require('mongoose')
const Schema = mongoose.Schema;


var EmployeeData = new Schema({
    productName: String,
    quantity: Number,

});


module.exports = mongoose.model("empData", EmployeeData, "EmployeeRequest")