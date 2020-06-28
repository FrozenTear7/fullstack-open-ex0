import React from 'react'
import { ContentProps } from '../types'
import Part from './Part'

const Content: React.FC<ContentProps> = ({ courseParts }) => (
  <div>
    {courseParts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </div>
)

export default Content
