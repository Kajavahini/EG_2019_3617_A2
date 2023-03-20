let User = require('../models/user')
let express = require('express')
let router = express.Router()

router.get('/', async (req, res) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })
  
  // GET /users/:id
  router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
  })
  
  // POST /users
  router.post('/', async (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
  
    try {
      const newUser = await user.save()
      res.status(201).json(newUser)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  })
  
  // PATCH /users/:id
  router.patch('/:id', getUser, async (req, res) => {
    if (req.body.username != null) {
      res.user.username = req.body.username
    }
    if (req.body.email != null) {
      res.user.email = req.body.email
    }
    if (req.body.password != null) {
      res.user.password = req.body.password
    }
  
    try {
      const updatedUser = await res.user.save()
      res.json(updatedUser)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  })
  
  // DELETE /users/:id
  router.delete('/:id', getUser, async (req, res) => {
    try {
      await res.User.delete()
      res.json({ message: 'Deleted user' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })
  
  // middleware function to get a single user by id
  async function getUser(req, res, next) {
    let user
    try {
      user = await User.findById(req.params.id)
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find user' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  
    res.user = user
    next()
  }
  
    module.exports = router