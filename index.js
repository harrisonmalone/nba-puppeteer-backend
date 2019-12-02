const express = require('express')
const cors = require('cors')
const getGames = require('./utils')
const mongoose = require('mongoose')
const morgan = require('morgan')
const Game = require('./models/Game')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.DB_URL, dbOptions, (err) => {
  if (err) {
    console.log('not connected ❌')
  } else {
    console.log('connected ✅')
  }
})

app.use(morgan('dev'))

app.use(cors({
  origin: process.env.CORS_URL
}))

app.get('/reset-games', async (req, res) => {
  const games = await getGames()
  await Game.deleteMany()
  await Game.insertMany(games)
  res.send('games inserted into db')
})

app.get('/games', async (req, res) => {
  const games = await Game.find()
  res.send(games)
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))