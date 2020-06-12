import React from 'react'
import PropTypes from 'prop-types'
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
      <div className="blog-title">{blog.title}</div>
      <div className="blog-author">{blog.author}</div>
      <Togglable buttonLabel="show" cancelLabel="hide">
        <div className="blog-more-content">
          {blog.url} <br />
          <div className="blog-likes">
            likes: {blog.likes}{' '}
            <button type="button" onClick={handleBlogLike}>
              like
            </button>
          </div>
          {blog.user.id === userId && (
            <button type="button" onClick={handleBlogDelete}>
              delete
            </button>
          )}
        </div>
      </Togglable>
    </div>
  )
}

Blog.displayName = 'Blog'
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
