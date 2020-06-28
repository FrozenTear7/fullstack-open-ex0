import React from 'react'
import { Icon, List } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { apiBaseUrl } from '../constants'
import { useStateValue, addPatientDetails, setDiagnosesList } from '../state'
import { Patient, Gender, Diagnosis } from '../types'
import EntryComponent from './EntryComponent'

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const [{ patients, diagnoses }, dispatch] = useStateValue()

  const patient = patients[id]

  React.useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        )
        dispatch(addPatientDetails(patientDetailsFromApi))
      } catch (e) {
        console.error(e)
      }
    }
    fetchPatientDetails()
    // if (!patient) fetchPatientDetails()
  }, [dispatch, id])

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          'http://localhost:3001/api/diagnoses'
        )
        dispatch(setDiagnosesList(diagnosesFromApi))
      } catch (e) {
        console.error(e)
      }
    }

    fetchDiagnoses()
  }, [dispatch])

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <Icon name="mars" />
      case Gender.Female:
        return <Icon name="venus" />
      case Gender.Other:
        return <Icon name="neuter" />
      default:
        return null
    }
  }

  while (!patient || !diagnoses) return null

  return (
    <div>
      <h2>
        {patient.name} {getGenderIcon(patient.gender)}
      </h2>
      {patient.ssn && <div>ssn: {patient.ssn}</div>}
      <div>occupation: {patient.occupation}</div>
      <br />
      {patient.entries && patient.entries.length > 0 && (
        <div>
          <h4>entries</h4>
          <List divided relaxed>
            {patient.entries.map((entry) => (
              <List.Item key={entry.id}>
                <EntryComponent entry={entry} diagnoses={diagnoses} />
              </List.Item>
            ))}
          </List>
        </div>
      )}
    </div>
  )
}

export default PatientPage
