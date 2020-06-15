import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'

const AnecdoteList = ({ anecdotes }) => {
  // const anecdotes = useSelector((state) =>
  //   state.anecdotes.filter((anecdote) =>
  //     anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
  //   )
  // )

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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    ),
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps)(AnecdoteList)

export default ConnectedAnecdoteList
