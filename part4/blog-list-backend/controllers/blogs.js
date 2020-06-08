import express from 'express'
import Blog from '../models/blog.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  const result = await blog.save()

  res.status(201).json(result)
})

blogsRouter.put('/:id', async (req, res) => {
  const { body } = req

  const result = await Blog.findByIdAndUpdate(
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

  res.status(200).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)

  res.status(204).end()
})

export default blogsRouter
