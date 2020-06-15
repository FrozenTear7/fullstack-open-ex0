import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async () => {
  const { data } = await axios.get(baseUrl)

  return data
}

const createAnecdote = async (content) => {
  const { data } = await axios.post(baseUrl, { content, votes: 0 })

  return data
}

const updateAnecdote = async (anecdote) => {
  const { data } = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)

  return data
}

export default { getAllAnecdotes, createAnecdote, updateAnecdote }
