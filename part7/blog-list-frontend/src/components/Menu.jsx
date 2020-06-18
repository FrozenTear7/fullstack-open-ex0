import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logoutUser } from '../actions/loginActions'

const Menu = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)

  return (
    <Navbar bg="light" expand="lg" style={{ marginBottom: '1%' }}>
      <LinkContainer to="/">
        <Navbar.Brand>Blogs</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/blogs">
            <Nav.Link>blogs</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create">
            <Nav.Link>create new</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/users">
            <Nav.Link>users</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>Signed in as: {user.username}</Navbar.Text>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => dispatch(logoutUser())}
        >
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
