import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { initBlogs } from './actions/blogActions'
import { logoutUser } from './actions/userActions'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const blogFormRef = useRef()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      <Notification />
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
            <BlogForm />
          </Togglable>
          <BlogList />
        </div>
      ) : (
        <div>
          <h2>Log in to application</h2>
          <LoginForm />
        </div>
      )}
    </div>
  )
}

export default App
