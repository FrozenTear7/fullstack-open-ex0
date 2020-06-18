import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Menu from './components/Menu'
import { initBlogs } from './actions/blogActions'
import { logoutUser } from './actions/loginActions'
import UserList from './components/UserList'
import User from './components/User'
import { initUsers } from './actions/userActions'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

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
          <Menu />
          <Switch>
            <Route exact path={['/', '/blogs']}>
              <BlogList />
            </Route>
            <Route path="/create">
              <BlogForm />
            </Route>
            <Route exact path="/users">
              <UserList />
            </Route>
            <Route exact path="/users/:id">
              <User />
            </Route>
          </Switch>
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
