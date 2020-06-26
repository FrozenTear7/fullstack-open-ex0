import React, { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { GET_USER } from './queries/userQueries'

const App = () => {
  const [token, setToken] = useState(
    window.localStorage.getItem('loggedLibraryToken')
  )
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')

  const { loading: userLoading, data: user } = useQuery(GET_USER)

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (userLoading) {
    return <div>Loading...</div>
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

          <Recommendations
            show={page === 'recommendations'}
            favoriteGenre={user.me.favoriteGenre}
          />

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
