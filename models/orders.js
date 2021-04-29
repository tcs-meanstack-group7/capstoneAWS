const mongoose = require('mongoose');

var Orders = mongoose.model('Orders', {
    id: { type: String },
    name: {type: String},
    emailid: { type: String },
    amount: { type: Number },
    status: { type: String }
});

module.exports = { Orders };