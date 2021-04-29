const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    empId:{type:String,required:true},
    password:{type:String,required:true, select:false}
});

EmployeeSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password,salt);
    return hash;
};

EmployeeSchema.methods.validPassword = async function(candidatePassword){
    const result = await bcrypt.compare(candidatePassword,this.password)
    return result;
}

module.exports = mongoose.model("emp", EmployeeSchema,"Employees");