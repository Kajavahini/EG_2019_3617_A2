require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const moviesRouter = require('./routes/movieRoutes')
app.use('/movies', moviesRouter)

const reviewRouter = require('./routes/reviewRoutes')
app.use('/review', reviewRouter)

const usersRouter = require('./routes/userRoutes')
app.use('/user', usersRouter)

const favoriteRouter = require('./routes/favoriteRoutes')
app.use('/favorite', favoriteRouter)

app.listen(3000, () => console.log('Server Started'))