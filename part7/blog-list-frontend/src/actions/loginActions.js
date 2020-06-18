import { SET_USER, REMOVE_USER } from '../types/loginTypes'
import loginService from '../services/login'
import { setNotification } from './notificationActions'

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      dispatch({
        type: SET_USER,
        data: user,
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

export const logoutUser = () => {
  window.localStorage.clear('loggedBlogappUser')

  return {
    type: REMOVE_USER,
  }
}
