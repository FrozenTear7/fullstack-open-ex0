import React from 'react'
import { PartProps } from '../types'
import { assertNever } from '../utils/assertions'

const Part: React.FC<PartProps> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          <p key={part.name}>
            <b>{part.name}</b>
            <div>{part.description}</div>
            <div>Number of exercises: {part.exerciseCount}</div>
          </p>
        </div>
      )
    case 'Using props to pass data':
      return (
        <div>
          <p key={part.name}>
            <b>{part.name}</b>
            <div>Number of group projects: {part.groupProjectCount}</div>
            <div>Number of exercises: {part.exerciseCount}</div>
          </p>
        </div>
      )
    case 'Deeper type usage':
      return (
        <div>
          <p key={part.name}>
            <b>{part.name}</b>
            <div>{part.description}</div>
            <a href={part.exerciseSubmissionLink}>
              {part.exerciseSubmissionLink}
            </a>
            <div>Number of exercises: {part.exerciseCount}</div>
          </p>
        </div>
      )
    case 'Amazing course if I say so myself':
      return (
        <div>
          <p key={part.name}>
            <b>{part.name}</b>
            <div>{part.description}</div>
            <div>Maximum participants: {part.maxParticipants}</div>
            <div>Number of exercises: {part.exerciseCount}</div>
          </p>
        </div>
      )

    default:
      return assertNever(part)
  }
}

export default Part
