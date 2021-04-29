const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise; 

const ItemSchema = new Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: String, required: true}
});

module.exports = mongoose.model("post", ItemSchema);
//let ProductModel = mongoose.model("product",ProductSchema,"Products");

//module.exports = ProductModel