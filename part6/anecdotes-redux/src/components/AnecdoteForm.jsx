import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const [content, setContent] = useState('')

  // const dispatch = useDispatch()

  const handleOnSubmitAnecdote = async (event) => {
    event.preventDefault()

    if (content) {
      // dispatch(createAnecdote(content))
      props.createAnecdote(content)

      // dispatch(setNotification(`Successfully added ${content}`, 5))
      props.setNotification(`Successfully added ${content}`, 5)

      setContent('')
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleOnSubmitAnecdote}>
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

const mapDispatchToProps = () => {
  return { createAnecdote, setNotification }
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
