const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Product } = require('../models/Products');

// => localhost:9090/Product/
router.get('/', (req, res) => {
    Product.find((err, docs) => {
        console.log(docs);
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Raiseticket requests :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    debugger;
    console.log(req.body);
    var product = new Product({
        id: req.body.id,
        name: req.body.name,
        price :  req.body.price,

    });
    product.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Request  Save :' + JSON.stringify(err, undefined, 2)); }
    });
});
module.exports = router;