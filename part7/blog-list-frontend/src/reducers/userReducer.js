import { INIT_USERS } from '../types/userTypes'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_USERS:
      return action.data
    default:
      return state
  }
}

export default reducer
