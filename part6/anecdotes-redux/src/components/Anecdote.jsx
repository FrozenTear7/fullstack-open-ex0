import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
  const { id, content, votes } = anecdote

  const dispatch = useDispatch()

  return (
    <div>
      <div>{content}</div>
      <div>
        has {votes}
        <button type="button" onClick={() => dispatch(voteForAnecdote(id))}>
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
