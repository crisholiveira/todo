const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET 
//função para gerar token
const generateToken = (id) => {
  return jwt.sign({id}, jwtSecret, {
    expiresIn: "7d",
  })
}

//registrar e logar
const register = async (req, res) => {
  res.send("Registro")
}

//exportar as funções para depois poder importar nas rotas
module.exports= {
  register,
}