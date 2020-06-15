import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const { content, votes } = anecdote

  const dispatch = useDispatch()

  const handleVoteOnClick = () => {
    dispatch(voteForAnecdote(anecdote))

    dispatch(setNotification(`You voted for '${content}'`, 5))
  }

  return (
    <div>
      <div>{content}</div>
      <div>
        has {votes}
        <button type="button" onClick={() => handleVoteOnClick()}>
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
