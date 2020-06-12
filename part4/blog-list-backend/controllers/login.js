import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import express from 'express'
import User from '../models/user.js'

const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  const { body } = req

  const user = await User.findOne({ username: body.username })
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.json({ token, username: user.username, name: user.name, id: user._id })
})

export default loginRouter
