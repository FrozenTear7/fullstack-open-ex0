import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'
import { CoursePart } from '../types'

const App: React.FC = () => {
  const courseName = 'Half Stack application development'
  const courseParts: Array<CoursePart> = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    },
    {
      name: 'Amazing course if I say so myself',
      exerciseCount: 15,
      description: 'This is a nice description',
      maxParticipants: 25,
    },
  ]

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
}

export default App
