import { Patient, NonSensitivePatient, NewPatient } from './../types'
import patientData from '../../data/patients'
import { v4 as uuidv4 } from 'uuid'

// const getPatients = (): Array<Patient> => {
//   return patientData
// }

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

const getPatient = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id === id)
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  }

  patientData.push(newPatient)
  return newPatient
}

export default {
  // getPatients,
  getNonSensitivePatients,
  getPatient,
  addPatient,
}
