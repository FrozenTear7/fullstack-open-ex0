import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

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
      <h3>{user.name}</h3>
      <h5>added blogs</h5>
      <ul>
        {user.blogs.map((blog) => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
