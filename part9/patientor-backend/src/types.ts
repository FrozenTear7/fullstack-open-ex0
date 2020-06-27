export type Diagnose = {
  code: string
  name: string
  latin?: string
}

type Gender = 'male' | 'female'

export type Patient = {
  id: string
  name: string
  dateOfBirth: string // probably change to some regex type date
  ssn: string
  gender: Gender
  occupation: string
}
