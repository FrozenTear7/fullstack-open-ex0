import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
  const [token, setToken] = useState(
    window.localStorage.getItem('loggedLibraryToken')
  )
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div style={{ color: 'red' }}>{errorMessage}</div>
      {token ? (
        <div>
          <div>
            <button type="button" onClick={() => setPage('authors')}>
              authors
            </button>
            <button type="button" onClick={() => setPage('books')}>
              books
            </button>
            <button type="button" onClick={() => setPage('recommendations')}>
              recommendations
            </button>
            <button type="button" onClick={() => setPage('add')}>
              add book
            </button>
            <button type="button" onClick={logout}>
              logout
            </button>
          </div>

          <Authors show={page === 'authors'} />

          <Books show={page === 'books'} />

          <Recommendations show={page === 'recommendations'} />

          <NewBook show={page === 'add'} />
        </div>
      ) : (
        <div>
          <LoginForm setError={setErrorMessage} setToken={setToken} />
        </div>
      )}
    </div>
  )
}

export default App
