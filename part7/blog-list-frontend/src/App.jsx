import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const setErrorMessageTemp = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAllBlogs()
        setBlogs(blogs)
      } catch (error) {
        setErrorMessageTemp({
          message: error.response.data.error,
          isPositive: false,
        })
      }
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = 'JSON.parse(loggedUserJSON)'
      setUser(user)
    }
  }, [])

  const loginUser = async (user) => {
    try {
      const loggedUser = await loginService.login(user)

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      )

      setErrorMessageTemp({
        message: 'Successfully logged in',
        isPositive: true,
      })

      setUser(loggedUser)
    } catch (error) {
      setErrorMessageTemp({
        message: error.response.data.error,
        isPositive: false,
      })
    }
  }

  const createBlog = async (blog) => {
    try {
      const createdBlog = await blogService.createBlog(blog)

      setErrorMessageTemp({
        message: `Successfully created blog: ${createdBlog.title}`,
        isPositive: true,
      })

      if (blogFormRef.current) blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(createdBlog))
    } catch (error) {
      setErrorMessageTemp({
        message: error.response.data.error,
        isPositive: false,
      })
    }
  }

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.updateBlog(blog)

      setErrorMessageTemp({
        message: 'Successfully liked the blog',
        isPositive: true,
      })

      setBlogs(
        blogs.map((blog) => {
          if (blog.id === updatedBlog.id) {
            return updatedBlog
          }
          return blog
        })
      )
    } catch (error) {
      setErrorMessageTemp({
        message: error.response.data.error,
        isPositive: false,
      })
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId)

      setErrorMessageTemp({
        message: 'Successfully deleted the blog',
        isPositive: true,
      })

      setBlogs(blogs.filter((blog) => blog.id !== blogId))
    } catch (error) {
      setErrorMessageTemp({
        message: error.response.data.error,
        isPositive: false,
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.clear('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      {user ? (
        <div>
          <h2>blogs</h2>
          {user.name} logged in
          <button type="button" onClick={handleLogout}>
            logout
          </button>
          <Togglable
            buttonLabel="new blog"
            cancelLabel="cancel"
            ref={blogFormRef}
          >
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                likeBlog={likeBlog}
                deleteBlog={deleteBlog}
              />
            ))}
        </div>
      ) : (
        <div>
          <h2>Log in to application</h2>
          <LoginForm loginUser={loginUser} />
        </div>
      )}
    </div>
  )
}

export default App
