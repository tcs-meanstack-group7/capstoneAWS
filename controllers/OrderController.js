const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Orders } = require('../models/orders');

// => localhost:9090/Product/
router.get('/', (req, res) => {
    Orders.find((err, docs) => {
        console.log(docs);
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Raiseticket requests :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var orders = new Orders({
        id: req.body.id,
        name: req.body.name,
        emailid: req.body.emailid,
        amount: req.body.amount,
        status : req.body.status,

    });
    orders.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Request  Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/getOrders', (req, res) => {
    console.log(req.body);
    oid = req.body.id
    Orders.find(({id:oid}),(err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Request Get Orders :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/update', (req, res) => {
    console.log(req.body);
    oid = req.body.id;
    newStatus = req.body.status;
    Orders.findOneAndUpdate({_id:oid},{$set:{status:newStatus}},(err,result)=> {
        if(!err){
            res.send({"Response":"Record updated succesfully"})
        }else {
            res.send("Error generated "+err);
        }
    })
})

module.exports = router;