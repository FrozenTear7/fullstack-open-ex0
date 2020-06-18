import React from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../actions/loginActions'
import { useField } from '../hooks'

const LoginForm = () => {
  const dispatch = useDispatch()

  const { clear: clearUsername, ...username } = useField('text')
  const { clear: clearPassword, ...password } = useField('password')

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(loginUser(username.value, password.value))

    clearUsername('')
    clearPassword('')
  }

  return (
    <div>
      <form id="login-form" onSubmit={handleLogin}>
        <div>
          username: <input {...username} />
        </div>
        <div>
          password: <input {...password} />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
