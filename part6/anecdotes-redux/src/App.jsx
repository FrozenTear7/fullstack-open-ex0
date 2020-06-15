import React from 'react'
import { useSelector } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector((state) => state)

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  )
}

export default App
