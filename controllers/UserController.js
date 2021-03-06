const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET
const Sequelize  = require('sequelize')

//função para gerar token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  })
}

//registrar e logar
const register = async (req, res) => {
  const { name, email, password } = req.body

  const user = await User.findOne({where: { email}})
  
  if (user) {
    res.status(422).json({ errors: ["Este e-mail já está cadastrado, por favor, utilize outro!"] })
    
    return
  }

  //gerar a senha hash
  const salt = await bcrypt.genSalt()
  const passwordHash = await bcrypt.hash(password, salt)

  //criar o usuario
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
    profile: "user"
  })

  //criado com sucesso

  if (!newUser) {
    res.status(422).json({ errors: ["Houve um erro, tente mais tarde!"] })
    return
  }
  res.status(201).json({
    id: newUser.id,
    token: generateToken(newUser.id)
  })
}


const update = async (req, res) => {
  res.send("Update")
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({where: { email }})

  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado"] })
    return
  }

  //confirmar senha
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha inválida!"] })
    return
  }

  //retornar token
  res.status(200).json({
    id: user.id,
    token: generateToken(user.id)
  })

}

const getCurrentUser = async (req, res) => {
  const user = req.user
  res.status(200).json(user)

}


//exportar as funções para depois poder importar nas rotas
module.exports = {
  register,
  login,
  getCurrentUser,
  update
}