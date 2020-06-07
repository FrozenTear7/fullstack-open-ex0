import axios from "axios";

const baseUrl = "/api/persons";

const getAllPersons = () => {
  return axios.get(baseUrl);
};

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const updatePerson = (updatedPerson) => {
  return axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson);
};

const deletePerson = (personId) => {
  return axios.delete(`${baseUrl}/${personId}`);
};

export default {
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson,
};
