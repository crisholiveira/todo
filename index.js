const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')
//models
const List = require('./models/List')
const User = require('./models/User')


//receber resposta do body
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

//session middleware
app.use(
  session({
    name: "session",
    secret: "secret",
    resave: false,
    store: new FileStore({
      logFn: function () { },
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000, //expira em um dia a conexão
      expires: new Date(Date.now() + 360000),
      httpOnly: true
    }
  })
)

//flash message
app.use(flash())


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
    app.listen()
  })
  .catch((err) => console.log(err))