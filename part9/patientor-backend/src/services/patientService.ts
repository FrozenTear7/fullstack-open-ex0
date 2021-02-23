import { NonSensitivePatient, Patient, NewPatient } from './../types';
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ ssn: _ssn, ...nonSensitivePatient }) => nonSensitivePatient
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};
