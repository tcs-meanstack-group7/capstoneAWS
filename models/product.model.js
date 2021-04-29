let mongoose = require("mongoose");
mongoose.Promise = global.Promise; 

let ProductSchema = new mongoose.Schema({
  //_id:Number,
    pname:String,
    price:Number,
    quantity:Number
    

})

let ProductModel = mongoose.model("product",ProductSchema,"Products");

module.exports = ProductModel