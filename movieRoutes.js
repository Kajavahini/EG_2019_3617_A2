let express = require('express')
let router = express.Router()
const Favorite = require('../models/movie')

// QueryString => query property on the request object
// localhost:3000/movie?name=fury&age=2015
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find()
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /movies/:id
router.get('/:id', getMovie, (req, res) => {
  res.json(res.movie)
})

// POST /movies
router.post('/', async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    year: req.body.year,
    genre: req.body.genre,
    director: req.body.director,
    actors: req.body.actors,
    plot: req.body.plot,
    posterUrl: req.body.posterUrl
  })

  try {
    const newMovie = await movie.save()
    res.status(201).json(newMovie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PATCH /movies/:id
router.patch('/:id', getMovie, async (req, res) => {
  if (req.body.title != null) {
    res.movie.title = req.body.title
  }
  if (req.body.year != null) {
    res.movie.year = req.body.year
  }
  if (req.body.genre != null) {
    res.movie.genre = req.body.genre
  }
  if (req.body.director != null) {
    res.movie.director = req.body.director
  }
  if (req.body.actors != null) {
    res.movie.actors = req.body.actors
  }
  if (req.body.plot != null) {
    res.movie.plot = req.body.plot
  }
  if (req.body.posterUrl != null) {
    res.movie.posterUrl = req.body.posterUrl
  }

  try {
    const updatedMovie = await res.movie.save()
    res.json(updatedMovie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE /movies/:id
router.delete('/:id', getMovie, async (req, res) => {
  try {
    await res.movie.remove()
    res.json({ message: 'Deleted movie' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// middleware function to get a single movie by id
async function getMovie(req, res, next) {
  let movie
  try {
    movie = await Movie.findById(req.params.id)
    if (movie == null) {
      return res.status(404).json({ message: 'Cannot find movie' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.movie = movie
  next()
}

module.exports = router
