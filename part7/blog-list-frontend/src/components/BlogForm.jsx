import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { createBlog } from '../actions/blogActions'
import { useField } from '../hooks'

const BlogForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { clear: clearTitle, ...title } = useField('text')
  const { clear: clearAuthor, ...author } = useField('text')
  const { clear: clearUrl, ...url } = useField('text')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    try {
      const newBlog = await dispatch(createBlog(blog))

      clearTitle()
      clearAuthor()
      clearUrl()

      history.push(`/blogs/${newBlog.id}`)
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <hr />
      <Form onSubmit={handleCreateBlog}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control placeholder="Blog title" {...title} />
        </Form.Group>
        <Form.Group controlId="formTitle">
          <Form.Label>Author</Form.Label>
          <Form.Control placeholder="Blog's" {...author} />
        </Form.Group>
        <Form.Group controlId="formUrl">
          <Form.Label>Url</Form.Label>
          <Form.Control placeholder="Blog title" {...url} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create blog
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
