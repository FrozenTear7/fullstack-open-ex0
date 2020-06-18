import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ children, buttonLabel, cancelLabel }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id="button-show" type="button" onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {children}
        <button id="button-hide" type="button" onClick={toggleVisibility}>
          {cancelLabel}
        </button>
      </div>
    </div>
  )
}

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired,
}

export default Togglable
