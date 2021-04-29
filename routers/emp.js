const express = require('express');
const router = express.Router();

const authController = require("../controllers/emp.controller");
const passportJWT = require('../middlewares/passportJWT')();
const { isEmail, hasPassword } = require('../validations/validators')

router.post("/login", authController.login);
router.post("/signUp", [hasPassword], authController.signup);
router.post("/sendRequest", authController.sendrequest)
router.post("/reviewRequest", authController.reviewRequest)
router.post("/editProfile", authController.editProfile)
router.post("/unlock", authController.unlock)
router.get("/viewTickets", authController.viewTickets)

//delete employee
router.delete("/deleteEmpById/:empId",authController.deleteEmpById);
router.delete("/deleteTicket/:email",authController.deleteTickets)

module.exports = router;