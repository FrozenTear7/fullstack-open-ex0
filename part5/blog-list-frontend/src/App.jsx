import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const setErrorMessageTemp = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (error) {
        setErrorMessageTemp({ message: error, isPositive: false })
      }
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setErrorMessageTemp({
        message: 'Successfully logged in',
        isPositive: true,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessageTemp({ message: 'Wrong credentials', isPositive: false })
    }
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      })

      setErrorMessageTemp({
        message: `Successfully create blog ${title}`,
        isPositive: true,
      })
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      setErrorMessageTemp({ message: error, isPositive: false })
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
          <BlogForm
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            handleBlogSubmit={handleBlogSubmit}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div>
          <h2>Log in to application</h2>
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      )}
    </div>
  )
}

export default App
