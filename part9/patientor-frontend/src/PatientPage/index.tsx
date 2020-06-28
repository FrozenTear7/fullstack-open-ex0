import React from 'react'
import { Icon } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { apiBaseUrl } from '../constants'
import { useStateValue, addPatientDetails } from '../state'
import { Patient, Gender } from '../types'

type PatientPageProps = {
  rating: number
  showText: boolean
}

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const [{ patients }, dispatch] = useStateValue()

  const patient = patients[id]

  React.useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        )
        console.log(patientDetailsFromApi)
        dispatch(addPatientDetails(patientDetailsFromApi))
      } catch (e) {
        console.error(e)
      }
    }

    if (!patient) fetchPatientDetails()
  }, [dispatch, id, patient])

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <Icon name="male" />
      case Gender.Female:
        return <Icon name="female" />
      case Gender.Other:
        return <Icon name="neuter" />
      default:
        return null
    }
  }

  if (!patient) return null

  return (
    <div>
      <h2>
        {patient.name} {getGenderIcon(patient.gender)}
      </h2>
      {patient.ssn && <div>ssn: {patient.ssn}</div>}
      {patient.dateOfBirth && <div>date of birth: {patient.dateOfBirth}</div>}
      <div>occupation: {patient.occupation}</div>
    </div>
  )
}

export default PatientPage
