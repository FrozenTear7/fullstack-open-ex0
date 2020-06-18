import {
  SET_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../types/notificationTypes'

const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.data
    case REMOVE_NOTIFICATION:
      return initialState
    default:
      return state
  }
}

export default reducer
