const { DataTypes} = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const List = db.define('List', {
  task: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  deadline: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
})
List.belongsTo(User)
User.hasMany(List)


module.exports = List