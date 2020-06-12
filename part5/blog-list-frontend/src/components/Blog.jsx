import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const userId =
    JSON.parse(window.localStorage.getItem('loggedBlogappUser')).id || ''

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleBlogLike = () => {
    likeBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleBlogDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable buttonLabel="show" cancelLabel="hide">
        <div>
          {blog.url} <br />
          likes: {blog.likes}{' '}
          <button type="button" onClick={handleBlogLike}>
            like
          </button>{' '}
          {blog.user.id === userId && (
            <button type="button" onClick={handleBlogDelete}>
              delete
            </button>
          )}
          <br />
          {blog.author}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
