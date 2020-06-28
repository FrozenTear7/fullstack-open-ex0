import React from 'react'
import { HeaderProps } from '../types'

const Header: React.FC<HeaderProps> = ({ courseName }) => (
  <div>
    <h1>{courseName}</h1>
  </div>
)

export default Header
