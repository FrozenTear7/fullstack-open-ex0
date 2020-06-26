import React, { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { GET_USER } from './queries/userQueries'
import { BOOK_ADDED, ALL_BOOKS } from './queries/bookQueries'

const App = () => {
  const [token, setToken] = useState(
    window.localStorage.getItem('loggedLibraryToken')
  )
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')

  const { loading: userLoading, data: user, refetch: loadUser } = useQuery(
    GET_USER
  )

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const updateCacheWith = (addedBook) => {
    try {
      console.log(addedBook)
      const includedIn = (set, object) =>
        set.map((p) => p.id).includes(object.id)

      const dataInStore = client.readQuery({
        query: ALL_BOOKS,
        variables: { genre: '' },
      })
      if (!includedIn(dataInStore.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          variables: { genre: '' },
          data: { allBooks: dataInStore.allBooks.concat(addedBook) },
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    },
  })

  if (userLoading) {
    return <div>Loading...</div>
  }

  if (!token || !user)
    return (
      <div>
        <div style={{ color: 'red' }}>{errorMessage}</div>
        <div>
          <LoginForm
            setError={setErrorMessage}
            setToken={setToken}
            loadUser={loadUser}
          />
        </div>
      </div>
    )

  return (
    <div>
      <div style={{ color: 'red' }}>{errorMessage}</div>
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
          // favoriteGenre={user.me.favoriteGenre}
          favoriteGenre="xd"
        />

        <NewBook show={page === 'add'} />
      </div>
    </div>
  )
}

export default App
