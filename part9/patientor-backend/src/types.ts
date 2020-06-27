export type Diagnose = {
  code: string
  name: string
  latin?: string
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export type Patient = {
  id: string
  name: string
  dateOfBirth: string // probably change to some regex type date
  ssn: string
  gender: Gender
  occupation: string
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>

export type NewPatient = Omit<Patient, 'id'>
