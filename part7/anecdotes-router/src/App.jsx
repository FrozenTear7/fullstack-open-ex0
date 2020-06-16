import React, { useState } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import Menu from './components/Menu'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ])
  const [notification, setNotification] = useState('')

  const history = useHistory()

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`a new anecdote ${anecdote.content} created`)
    setTimeout(() => {
      setNotification('')
    }, 10000)

    history.push('/')
  }

  // const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1,
  //   }

  //   setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  // }

  const matchAnecdote = useRouteMatch('/anecdotes/:id')
  const anecdote = matchAnecdote
    ? anecdotes.find((anecdote) => anecdote.id === matchAnecdote.params.id)
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification notification={notification} />
      <Menu />
      <Switch>
        <Route exact path={['/', '/anecdotes']}>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route exact path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
