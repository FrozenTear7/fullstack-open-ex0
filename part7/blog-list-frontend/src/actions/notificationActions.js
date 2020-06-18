import {
  SET_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../types/notificationTypes'

let timeoutId

const setNotificationMessage = (message) => {
  return {
    type: SET_NOTIFICATION,
    data: message,
  }
}

const removeNotificationMessage = () => {
  return {
    type: REMOVE_NOTIFICATION,
  }
}

export const setNotification = (message, timeoutSeconds = 5) => {
  return async (dispatch) => {
    dispatch(setNotificationMessage(message))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(removeNotificationMessage())
    }, timeoutSeconds * 1000)
  }
}
