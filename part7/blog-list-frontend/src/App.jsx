import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Menu from './components/Menu'
import { initBlogs } from './actions/blogActions'
import UserList from './components/UserList'
import User from './components/User'
import { initUsers } from './actions/userActions'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  return (
    <div>
      {user ? (
        <div>
          <Menu />
          <div className="container">
            <Notification />
            <Switch>
              <Route exact path={['/', '/blogs']}>
                <BlogList />
              </Route>
              <Route exact path="/blogs/:id">
                <Blog />
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
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}

export default App
