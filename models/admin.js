const mongoose = require('mongoose');

var Request = mongoose.model('Request', {
    quantity: { type: Number},
    productName: {type: String},
})

module.exports = { Request };