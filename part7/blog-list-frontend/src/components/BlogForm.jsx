import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
      await dispatch(createBlog(blog))

      clearTitle()
      clearAuthor()
      clearUrl()

      history.push('/blogs')
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  return (
    <div>
      <h2>create new</h2>
      <form id="blog-form" onSubmit={handleCreateBlog}>
        <div>
          title: <input {...title} />
        </div>
        <div>
          author: <input {...author} />
        </div>
        <div>
          url: <input {...url} />
        </div>
        <button id="button-create-blog" type="submit">
          create blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm
