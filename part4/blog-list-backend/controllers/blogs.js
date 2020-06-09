import express from 'express'
import Blog from '../models/blog.js'
import User from '../models/user.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const { body } = req

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const { body } = req

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
      },
    },
    { runValidators: true, context: 'query', new: true }
  )

  res.json(updatedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)

  res.status(204).end()
})

export default blogsRouter
