import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const { id, content, votes } = anecdote

  const dispatch = useDispatch()

  const handleVoteOnClick = (id) => {
    dispatch(voteForAnecdote(id))

    dispatch(setNotification(`You voted for '${content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <div>{content}</div>
      <div>
        has {votes}
        <button type="button" onClick={() => handleVoteOnClick(id)}>
          vote
        </button>
      </div>
    </div>
  )
}

Anecdote.displayName = 'Anecdote'
Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
}

export default Anecdote
