import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch, useHistory, Link } from 'react-router-dom'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { updateBlog, deleteBlog, postComment } from '../actions/blogActions'
import { useField } from '../hooks'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { id: userId } = useSelector((state) => state.login)

  const matchBlog = useRouteMatch('/blogs/:id')
  const matchId = (matchBlog && matchBlog.params.id) || null

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === matchId)
  )

  const { clear: clearContent, ...content } = useField('text')

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

  const handlePostComment = (event) => {
    event.preventDefault()

    try {
      dispatch(postComment(blog.id, { content: content.value }))

      clearContent()
      // eslint-disable-next-line no-empty
    } catch (error) {}
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
      <hr />
      <h4>comments</h4>
      <Form onSubmit={handlePostComment}>
        <Form.Group controlId="formComment">
          <Form.Label>Comment</Form.Label>
          <Form.Control placeholder="Comment" {...content} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Post
        </Button>
      </Form>
      <hr />
      <ListGroup>
        {blog.comments.map((comment) => (
          <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Blog
