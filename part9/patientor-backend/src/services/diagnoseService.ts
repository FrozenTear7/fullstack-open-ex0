import { diagnosis } from './../types'
import diagnoseData from '../../data/diagnoses'

const getDiagnoses = (): Array<diagnosis> => {
  return diagnoseData
}

export default {
  getDiagnoses,
}
