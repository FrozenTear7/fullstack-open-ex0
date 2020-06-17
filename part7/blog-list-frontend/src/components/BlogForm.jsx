import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../actions/blogActions'
import { setNotification } from '../actions/notificationActions'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()

    try {
      const blog = {
        title,
        author,
        url,
      }

      dispatch(createBlog(blog))

      setTitle('')
      setAuthor('')
      setUrl('')

      setNotification({
        message: `Successfully created blog: ${blog.title}`,
        isPositive: true,
      })

      // if (blogFormRef.current) blogFormRef.current.toggleVisibility()
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        isPositive: false,
      })
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form id="blog-form" onSubmit={handleCreateBlog}>
        <div>
          title:{' '}
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="button-create-blog" type="submit">
          create blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm
