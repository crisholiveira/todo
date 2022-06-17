const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('todo', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('Conectamos com sucesso!')
} catch (err) {
  console.log(`Não foi possível conectrar: ${err}`)
}

module.exports = sequelize