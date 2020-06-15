import React from 'react'
import PropTypes from 'prop-types'
import Anecdote from './Anecdote'

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  )
}

AnecdoteList.displayName = 'AnecdoteList'
AnecdoteList.propTypes = {
  anecdotes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default AnecdoteList
