import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/bookQueries'

const Books = ({ show }) => {
  const { data } = useQuery(ALL_BOOKS)
  let books = []

  if (data) books = data.allBooks

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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
