import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch, Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = () => {
  const matchUser = useRouteMatch('/users/:id')
  const matchId = (matchUser && matchUser.params.id) || null

  const user = useSelector((state) =>
    state.users.find((user) => user.id === matchId)
  )

  if (!user) {
    return <div>User does not exist!</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <hr />
      <h4>Added blogs</h4>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
