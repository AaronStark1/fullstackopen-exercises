const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    try {
      const users = await User.find({}).populate('blogs', { title: 1, author: 1, url:1 }) // Populate blogs
      response.json(users)
    } catch (error) {
      response.status(400).end()
    }
  })
  

usersRouter.post('/', async (request, response, next) => {
  const { username, password, name } = request.body

  // Check if username or password is missing
  if (!username || !password) {
    return response.status(400).json({ error: 'username and password are required' })
  }

  // Check if username and password are at least 3 characters long
  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({ error: 'username and password must be at least 3 characters long' })
  }
  // Hash the password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
