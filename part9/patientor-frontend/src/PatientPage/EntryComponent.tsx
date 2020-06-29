import React from 'react'
import { Entry, Diagnosis } from '../types'
import { List } from 'semantic-ui-react'

type EntryComponentProps = {
  entry: Entry
  diagnoses: { [code: string]: Diagnosis }
}

const EntryComponent = ({ entry, diagnoses }: EntryComponentProps) => {
  const renderTypeDetails = () => {
    switch (entry.type) {
      case 'HealthCheck':
        return (
          <div>
            <div>Health check rating: {entry.healthCheckRating}</div>
          </div>
        )
      case 'Hospital':
        return (
          <div>
            <div>Date: {entry.discharge.date}</div>
            <div>Criteria: {entry.discharge.criteria}</div>
          </div>
        )
      case 'OccupationalHealthcare':
        return (
          <div>
            <div>Employer: {entry.employerName}</div>
            {entry.sickLeave && (
              <div>
                Start: {entry.sickLeave.startDate}
                End: {entry.sickLeave.endDate}
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <List.Header>{entry.date}</List.Header>
      <List.Content>
        <List.Description>
          <b>{entry.type}</b>
          <div>{entry.description}</div>
          {renderTypeDetails()}
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((code) => (
                <li key={code}>{diagnoses[code] && diagnoses[code].name}</li>
              ))}
          </ul>
        </List.Description>
      </List.Content>
    </div>
  )
}

export default EntryComponent
