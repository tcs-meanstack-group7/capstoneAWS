const mongoose = require('mongoose');

var RaiseTicket = mongoose.model('RaiseTicket', {
    UserEmail: { type: String },
    Reason: { type: String },

});

module.exports = { RaiseTicket };