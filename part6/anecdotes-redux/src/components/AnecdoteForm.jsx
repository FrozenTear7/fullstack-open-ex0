import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const [content, setContent] = useState('')

  const dispatch = useDispatch()

  const handleOnSubmit = (event) => {
    event.preventDefault()

    if (content) {
      dispatch(createAnecdote(content))

      setContent('')
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          <input
            onChange={({ target }) => setContent(target.value)}
            value={content}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
