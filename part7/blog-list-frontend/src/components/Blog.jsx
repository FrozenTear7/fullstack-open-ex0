import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch, useHistory, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { updateBlog, deleteBlog } from '../actions/blogActions'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { id: userId } = useSelector((state) => state.login)

  const matchBlog = useRouteMatch('/blogs/:id')
  const matchId = (matchBlog && matchBlog.params.id) || null

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === matchId)
  )

  const handleLikeBlog = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const handleDeleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await dispatch(deleteBlog(blog.id))

        history.push('/blogs')
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }
  }

  if (!blog) {
    return <div>Blog does not exist!</div>
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <hr />
      <div>
        <a href={blog.url}>{blog.url}</a> <br />
        <div>
          likes: {blog.likes}{' '}
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={handleLikeBlog}
          >
            like
          </Button>
        </div>
        <small>
          added by{' '}
          <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
        </small>
        {blog.user.id === userId && (
          <div>
            <br />
            <Button
              variant="danger"
              size="sm"
              type="button"
              onClick={handleDeleteBlog}
            >
              delete
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
