import { SET_USER, REMOVE_USER } from '../types/userTypes'
import loginService from '../services/login'

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    dispatch({
      type: SET_USER,
      data: user,
    })
  }
}

export const logoutUser = () => {
  window.localStorage.clear('loggedBlogappUser')

  return {
    type: REMOVE_USER,
  }
}
