const initialState = ''

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotificationMessage = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: message,
  }
}

export const removeNotificationMessage = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

export const setNotification = (message, timeoutSeconds) => {
  return async (dispatch, getState) => {
    dispatch(setNotificationMessage(message))
    setTimeout(() => {
      // So we don't remove the notification that comes after
      // (ofc it's not perfect, since we only check the message content)
      if (getState().notification === message)
        dispatch(removeNotificationMessage())
    }, timeoutSeconds * 1000)
  }
}

export default reducer
