import express from 'express'
import jwt from 'jsonwebtoken'
import Blog from '../models/blog.js'
import User from '../models/user.js'
import config from '../utils/config.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const { body, token } = req

  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  let savedBlog = await blog.save()
  savedBlog = await savedBlog
    .populate('user', { username: 1, name: 1 })
    .execPopulate()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const { body } = req

  const blog = await Blog.findById(req.params.id).populate('user', {
    username: 1,
    name: 1,
  })

  if (!blog) {
    return res.status(400).json({ error: 'blog does not exist' })
  }

  blog.likes = body.likes

  await blog.save()
  res.json(blog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const { token } = req

  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(400).json({ error: 'blog does not exist' })
  }

  if (blog.user.equals(user._id)) {
    await blog.remove()
    res.status(204).end()
  } else {
    return res
      .status(401)
      .json({ error: 'you must be the author of the blog to remove it' })
  }
})

export default blogsRouter
