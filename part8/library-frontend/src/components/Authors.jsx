import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries/authorQueries'

const Authors = ({ show }) => {
  const { data } = useQuery(ALL_AUTHORS)
  let authors = []

  if (data) authors = data.allAuthors

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
