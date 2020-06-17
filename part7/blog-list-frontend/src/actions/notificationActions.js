import {
  SET_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../types/notificationTypes'

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
