import express from 'express'
import patientService from '../services/patientService'
import toNewPatient from '../utils/toNewPatient'

const router = express.Router()

router.get('/', (_req, res) => {
  const patients = patientService.getNonSensitivePatients()

  res.send(patients)
})

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body)
    console.log('XDDD')
    const addedPatient = patientService.addPatient(newPatient)
    res.json(addedPatient)
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message)
  }
})

export default router
