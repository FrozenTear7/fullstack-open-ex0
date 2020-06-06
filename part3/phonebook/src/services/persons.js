import axios from "axios";

const baseUrl = "/api/persons";

const getAllPersons = () => {
  return axios.get(baseUrl);
};

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const deletePerson = (personId) => {
  return axios.delete(`${baseUrl}/${personId}`);
};

export default {
  getAllPersons,
  createPerson,
  deletePerson,
};
