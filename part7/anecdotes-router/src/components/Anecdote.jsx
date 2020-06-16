import React from 'react'

const Anecdote = ({ anecdote }) => {
  if (anecdote) {
    const { content, author, info } = anecdote
    return (
      <div>
        {content} <br />
        {author} <br />
        {info}
      </div>
    )
  }

  return <div>Anecdote with this id does not exist!</div>
}

export default Anecdote
