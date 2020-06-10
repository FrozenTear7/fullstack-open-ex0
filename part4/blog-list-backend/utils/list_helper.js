/* eslint-disable no-unused-vars */
import _ from 'lodash'

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0

  return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.sort((a, b) => b.likes - a.likes)[0]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  return _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({
      author: key,
      blogs: value.length,
    }))
    .sort((a, b) => b.blogs - a.blogs)
    .value()[0]
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  return _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({
      author: key,
      likes: value.reduce((acc, blog) => acc + blog.likes, 0),
    }))
    .sort((a, b) => b.blogs - a.blogs)
    .value()[0]
}

export { totalLikes, favoriteBlog, mostBlogs, mostLikes }
