const express = require('express')
const Review = require('../models/review')
const router = express.Router()

// GET /reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /reviews/:id
router.get('/:id', getReview, (req, res) => {
  res.json(res.review)
})

// POST /reviews
router.post('/', async (req, res) => {
  const review = new Review({
    movieId: req.body.movieId,
    userId: req.body.userId,
    rating: req.body.rating,
    comment: req.body.comment
  })

  try {
    const newReview = await review.save()
    res.status(201).json(newReview)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PATCH /reviews/:id
router.patch('/:id', getReview, async (req, res) => {
  if (req.body.rating != null) {
    res.review.rating = req.body.rating
  }
  if (req.body.comment != null) {
    res.review.comment = req.body.comment
  }

  try {
    const updatedReview = await res.review.save()
    res.json(updatedReview)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE /reviews/:id
router.delete('/:id', getReview, async (req, res) => {
  try {
    await res.review.remove()
    res.json({ message: 'Deleted review' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// middleware function to get a single review by id
async function getReview(req, res, next) {
  let review
  try {
    review = await Review.findById(req.params.id)
    if (review == null) {
      return res.status(404).json({ message: 'Cannot find review' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.review = review
  next()
}

module.exports = router
