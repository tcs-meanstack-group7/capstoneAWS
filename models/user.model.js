const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    email:{type:String,required:true},
    password:{type:String,required:true, select:false},
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    dob:{type:Date,required:true},
    pnumber:{type:Number,required:true},
    address:{type:String,required:true},
    cart:[{type:Schema.Types.ObjectId, ref: "product"}],
    funds:{type:Number,required:true},
    bankBalance:{type:Number,required:true},
    bankAccountNumber:{type:Number,required:true},
    isLocked:{type:Boolean,required:true},
    consecutiveFailed:{type:Number,required:true}

});

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

UserSchema.methods.validPassword = async function(candidatePassword) {
    const result = await bcrypt.compare(candidatePassword, this.password)
    return result;
}


module.exports = mongoose.model("user", UserSchema, "Users");