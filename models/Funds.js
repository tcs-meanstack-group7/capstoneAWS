const mongoose = require('mongoose');

var Funds = mongoose.model('Funds', {
    id: { type: Number },
    emailid: { type: String },
    funds: { type: Number },
});

module.exports = { Funds };