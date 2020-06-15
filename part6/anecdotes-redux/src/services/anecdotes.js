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

export default { getAllAnecdotes, createAnecdote }
