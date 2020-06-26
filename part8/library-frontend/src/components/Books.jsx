import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries/bookQueries'

const Books = ({ show }) => {
  const [filter, setFilter] = useState('')

  const { loading: genresLoading, data: genres } = useQuery(ALL_GENRES)

  const { loading: booksLoading, data: books, refetch: loadBooks } = useQuery(
    ALL_BOOKS,
    {
      variables: { genre: filter },
    }
  )

  useEffect(() => {
    loadBooks()
  }, [filter, loadBooks])

  if (!show) {
    return null
  }

  if (booksLoading || genresLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        in genre <b>{filter}</b>
      </div>

      <select value={filter} onChange={({ target }) => setFilter(target.value)}>
        <option value="">No filter</option>
        {genres.allGenres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.allBooks
            // .filter((book) => {
            //   if ((filter && book.genres.includes(filter)) || !filter)
            //     return book
            //   return null
            // })
            .map((a) => (
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

export default Books
