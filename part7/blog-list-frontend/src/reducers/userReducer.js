import { SET_USER, REMOVE_USER } from '../types/userTypes'

const initialState = JSON.parse(
  window.localStorage.getItem('loggedBlogappUser')
)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.data
    case REMOVE_USER:
      return null
    default:
      return state
  }
}

export default reducer
