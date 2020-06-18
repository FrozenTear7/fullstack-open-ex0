import React from 'react'
import PropTypes from 'prop-types'

const User = ({ user }) => {
  if (!user) {
    return <div>User does not exist!</div>
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li>{blog.id}</li>
        ))}
      </ul>
    </div>
  )
}

User.displayName = 'User'
User.defaultProps = null
User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }),
}

export default User
