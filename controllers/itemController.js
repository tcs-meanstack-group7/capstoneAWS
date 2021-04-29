let Item = require("../routers/item");
const validationHandler = require("../validations/validationHandler");

exports.index = async (req, res) => {
    try {
        const items = await Item.find().populate("user").sort({createdAt:-1});
        res.send(items);
    } catch(err) {
        next(err);
    }
}

exports.show = async(req, res) => {
    try {
        const item = await Item.findOne({
            _id: req.params.id
        }).populate("user");
        res.send(item);
    } catch(err){
        next(err);
    }
};

exports.store = async(req, res, next) => {
    try {
        validationHandler(req);

        let item = new Item();
        item.name = req.body.name;
        item.price = req.body.price;
    } catch(err) {
        next(err);
    }
}

exports.update = async(req,res,next) => {
    try {
        validationHandler(req);

        let item = new Item();
        item.name = req.body.name;
        item.price = req.body.price;
        item = await item.save();

        res.send(item);
    } catch(err) {
        next(err);
    }
}

exports.delete = async(req, res, next) => {
    try {
        let item = await Item.findById(req.params.id);
        await item.delete();

        res.send({message: "success"});
    } catch(err) {
        next(err);
    }
}