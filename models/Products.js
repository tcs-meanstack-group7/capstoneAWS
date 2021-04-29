const mongoose = require('mongoose');

var Product = mongoose.model('Product', {
    id: { type: String },
    name: { type: String },
    price: { type: Number },
});

module.exports = { Product };