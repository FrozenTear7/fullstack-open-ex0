const initialState = []

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'CREATE_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      return state.map((anecdote) => {
        if (anecdote.id === action.data) {
          return { ...anecdote, votes: anecdote.votes + 1 }
        }
        return anecdote
      })
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE_ANECDOTE',
    data: anecdote,
  }
}

export const voteForAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: id,
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default reducer
