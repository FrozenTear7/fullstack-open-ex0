import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/bookQueries'

const Recommendations = ({ show, favoriteGenre }) => {
  const [loadBooks, { loading: booksLoading, data: books }] = useLazyQuery(
    ALL_BOOKS,
    {
      variables: { genre: favoriteGenre },
    }
  )

  useEffect(() => {
    loadBooks()
  }, [loadBooks, favoriteGenre])

  if (!show) {
    return null
  }

  if (booksLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        books in your favorite genre <b>{favoriteGenre}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
