const express = require('express')
const Favorite = require('../models/favorite')
const router = express.Router()

// GET /favorites
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.find()
    res.json(favorites)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /favorites/:id
router.get('/:id', getFavorite, (req, res) => {
  res.json(res.favorite)
})

// POST /favorites
router.post('/', async (req, res) => {
  const favorite = new Favorite({
    movieId: req.body.movieId,
    userId: req.body.userId
  })

  try {
    const newFavorite = await favorite.save()
    res.status(201).json(newFavorite)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE /favorites/:id
router.delete('/:id', getFavorite, async (req, res) => {
  try {
    await res.favorite.remove()
    res.json({ message: 'Deleted favorite' })
  } catch (error) {
    res.status(500).json({ message: error.message })
}
})

async function getFavorite(req, res, next) {
    let favorite
    try {
      favorite = await Favorite.findById(req.params.id)
      if (favorite == null) {
        return res.status(404).json({ message: 'Cannot find favorite' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  
    res.review = review
    next()
  }
  
