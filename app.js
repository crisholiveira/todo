const express = require('express')
const app = express()
//conexão banco de dados
const conn = require('./db/conn')
//models
const List = require('./models/List')
const User = require('./models/User')
require('dotenv').config()

const port = process.env.PORT


//receber resposta do body
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

//routes
const router = require('./routes/Router.js')
app.use(router)

//salvar o usuário na sessão
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session
  }
  next()
})

conn.sync()
  //.sync({ force: true })
  .then(() => {
    app.listen(port, ()=>{
      console.log(`App rodando na porta ${port}`)
    })
  })
  .catch((err) => console.log(err))