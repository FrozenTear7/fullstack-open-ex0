import React from 'react'
import { ContentProps } from '../types'

const Content: React.FC<ContentProps> = ({ courseParts }) => (
  <div>
    {courseParts.map(({ name, exerciseCount }) => (
      <p key={name}>
        {name} {exerciseCount}
      </p>
    ))}
  </div>
)

export default Content
