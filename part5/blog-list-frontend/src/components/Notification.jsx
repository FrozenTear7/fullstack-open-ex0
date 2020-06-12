import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ errorMessage }) => {
  if (!errorMessage || !errorMessage.message) {
    return null
  }

  return (
    <div
      className={`notification ${
        errorMessage.isPositive ? 'success' : 'error'
      }`}
    >
      {errorMessage.message}
    </div>
  )
}

Notification.displayName = 'Notification'
Notification.defaultProps = {
  errorMessage: {},
}
Notification.propTypes = {
  errorMessage: PropTypes.object,
}

export default Notification
