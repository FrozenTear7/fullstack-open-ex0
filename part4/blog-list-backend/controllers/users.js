import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'

const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  })

  res.json(users.map((u) => u.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  const { body } = req

  if (!body.password || body.password.length < 3) {
    return res
      .status(400)
      .json({ error: 'provide a password at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

export default usersRouter
