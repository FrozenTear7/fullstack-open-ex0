import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
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
    <div className="container">
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Username" {...username} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder="" {...password} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
