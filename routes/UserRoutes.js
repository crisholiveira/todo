const express = require("express")
const router = express.Router()

//controller
const { register } = require("../controllers/UserController")

//middleware
const validate = require("../middlewares/handleValidation")
const { userCreateValidation } = require("../middlewares/userValidations")

//routes
router.post("/register", userCreateValidation(), validate, register)

module.exports = router