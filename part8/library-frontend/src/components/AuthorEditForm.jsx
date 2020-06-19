import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries/authorQueries'

const AuthorEditForm = ({ show, authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: +born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map((author) => (
            <option value={author.name}>{author.name}</option>
          ))}
        </select>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorEditForm
