import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Menu from './components/Menu'
import { initBlogs } from './actions/blogActions'
import { logoutUser } from './actions/loginActions'
import UserList from './components/UserList'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const matchUser = useRouteMatch('/users/:id')
  const matchId = (matchUser && matchUser.params.id) || null
  const matchedUser = useSelector((state) =>
    state.users.find((anecdote) => anecdote.id === matchId)
  )

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
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/users/:id">
              <User user={matchedUser} />
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
