import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Togglable from './Togglable'
import { updateBlog, deleteBlog } from '../actions/blogActions'
import { setNotification } from '../actions/notificationActions'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const { id: userId } = useSelector((state) => state.user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLikeBlog = () => {
    try {
      dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))

      setNotification({
        message: 'Successfully liked the blog',
        isPositive: true,
      })
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        isPositive: false,
      })
    }
  }

  const handleDeleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog.id))

        setNotification({
          message: 'Successfully deleted the blog',
          isPositive: true,
        })
      } catch (error) {
        setNotification({
          message: error.response.data.error,
          isPositive: false,
        })
      }
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      <div className="blog-title">{blog.title}</div>
      <div className="blog-author">{blog.author}</div>
      <Togglable buttonLabel="show" cancelLabel="hide">
        <div className="blog-more-content">
          {blog.url} <br />
          <div className="blog-likes">
            likes: {blog.likes}{' '}
            <button id="button-like" type="button" onClick={handleLikeBlog}>
              like
            </button>
          </div>
          {blog.user.id === userId && (
            <button id="button-delete" type="button" onClick={handleDeleteBlog}>
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
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

export default Blog
