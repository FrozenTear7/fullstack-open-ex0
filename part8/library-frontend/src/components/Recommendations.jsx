import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/bookQueries'
import { GET_USER } from '../queries/userQueries'

const Recommendations = ({ show }) => {
  let { data: books } = useQuery(ALL_BOOKS)
  let { data: user } = useQuery(GET_USER)

  if (!show || !books) {
    return null
  }

  if (books) books = books.allBooks
  if (user) user = user.me

  return (
    <div>
      <h2>books</h2>

      <div>
        books in your favorite genre <b>{user.favoriteGenre}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => book.genres.includes(user.favoriteGenre))
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

export default Recommendations
