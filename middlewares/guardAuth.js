const User = require('../models/User')
const jwt = require("jsonwebtoken")



const jwtSecret = process.env.JWT_SECRET



const guardAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  

  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] })

  //token valido
  try {
    const verified = jwt.verify(token, jwtSecret)           

    req.user = await User.findOne({where: verified.id})
    next()

  } catch (err) {
    res.status(400).json({ errors: ["O Token é inválido!"] })
  }
}

module.exports = guardAuth