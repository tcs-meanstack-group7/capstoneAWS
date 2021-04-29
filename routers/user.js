const express = require('express');
const router = express.Router();

const userController = require("../controllers/user.controller");
const passportJWT = require('../middlewares/passportJWT')();

const { isEmail, hasPassword } = require('../validations/validators')

router.post("/login", userController.login);
router.post("/signUp", [isEmail, hasPassword ], userController.signup);
router.get("/funds/:id",userController.funds);
router.put("/addFunds",userController.addFunds);
router.put("/spend",userController.spend);

router.put("/editUser",userController.edit);

module.exports = router;