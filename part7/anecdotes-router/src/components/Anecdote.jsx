import React from 'react'

const Anecdote = ({ anecdote }) => {
  if (anecdote) {
    return <div>{anecdote.content}</div>
  }

  return <div>Anecdote with this id does not exist!</div>
}

export default Anecdote
