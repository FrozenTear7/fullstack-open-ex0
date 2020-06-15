import React from 'react'
import PropTypes from 'prop-types'
import Anecdote from './Anecdote'

const Anecdotes = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  )
}

Anecdotes.displayName = 'Anecdotes'
Anecdotes.propTypes = {
  anecdotes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Anecdotes
