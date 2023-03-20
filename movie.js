
const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  actors: {
    type: [String],
    required: true
  },
  plot: {
    type: String,
    required: true
  },
  posterUrl: {
    type: String,
    required: true
  }
})


module.exports = mongoose.model('Movie', movieSchema)
