const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  comment: { type: String, required: true }
})

module.exports = mongoose.model('Review', reviewSchema)