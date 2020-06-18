import { INIT_USERS } from '../types/userTypes'
import userService from '../services/users'
import { setNotification } from './notificationActions'

export const initUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAllUsers()

      dispatch({
        type: INIT_USERS,
        data: users,
      })
    } catch (error) {
      dispatch(
        setNotification({
          message: error.response.data.error,
          isPositive: false,
        })
      )
    }
  }
}
