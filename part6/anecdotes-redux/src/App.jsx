import React from 'react'
import { useSelector } from 'react-redux'
import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector((state) => state)

  return (
    <div>
      <Anecdotes anecdotes={anecdotes} />
      <AnecdoteForm />
    </div>
  )
}

export default App
