import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/bookQueries'

const Books = ({ show }) => {
  const [filter, setFilter] = useState('')

  const { data } = useQuery(ALL_BOOKS)
  let books = []

  if (data) books = data.allBooks

  if (!show || !books) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        in genre <b>{filter}</b>
      </div>

      <select value={filter} onChange={({ target }) => setFilter(target.value)}>
        <option value="">No filter</option>
        {Array.from(
          new Set(books.reduce((acc, book) => [...acc, ...book.genres], [])) // convert to Set to remove duplicates
        ).map((genre) => (
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
          {books
            .filter((book) => {
              if ((filter && book.genres.includes(filter)) || !filter)
                return book
              return null
            })
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
