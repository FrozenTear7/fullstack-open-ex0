import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
    return axios.get(baseUrl);
};

const createPerson = (newPerson) => {
    return axios.post(baseUrl, newPerson);
};

const deletePerson = (personId) => {
    return axios.delete(`${baseUrl}/${personId}`);
};

const updatePerson = (updatedPerson) => {
    console.log(updatedPerson);
    return axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson);
};

export default {
    getAllPersons,
    createPerson,
    deletePerson,
    updatePerson,
};