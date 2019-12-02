const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
  event: String,
  date: String
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game