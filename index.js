const express = require('express')
const cors = require('cors')
const getGames = require('./utils')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: process.env.CORS_URL
}))

app.get('/games', async (req, res) => {
  res.send(await getGames())
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))