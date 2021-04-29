let express = require(express);
let itemController = require("../controllers/itemController");
const { hasName, hasPrice } = require("../validations/validators");
let router = express.Router();

router.get("/", itemController.index);
router.get("/:id", itemController.show);
router.post("/",
    hasName,
    hasPrice,
    itemController.store
);
router.patch("/:id", hasName, hasPrice, itemController.update);

module.exports = router;