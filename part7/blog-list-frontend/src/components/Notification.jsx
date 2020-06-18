import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const errorMessage = useSelector((state) => state.notification)

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

export default Notification
