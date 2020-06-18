import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initUsers } from '../actions/userActions'

const UserList = () => {
  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)
  console.log(users)

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
