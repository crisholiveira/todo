const express = require("express")
const router = express.Router()

//controller
const { register, login, getCurrentUser, update } = require("../controllers/UserController")

//middleware
const validate = require("../middlewares/handleValidation")
const guardAuth = require('../middlewares/guardAuth')
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidations")

//routes
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", loginValidation(), validate, login)
router.get('/profile', guardAuth, getCurrentUser)
router.put("/", guardAuth, userUpdateValidation(), validate, update)


module.exports = router