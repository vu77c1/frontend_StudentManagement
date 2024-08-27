import axios from "./axios.customize.js";

const getAllUniversities = () => {
  const URL_BACKEND = `/universities`;
  return axios.get(URL_BACKEND);
}
const deleteUniversity = (id) => {
  const URL_BACKEND = `/universities/${id}`;//backtick
  return axios.delete(URL_BACKEND);
}
const addUniversity = (universityData) => {
  const URL_BACKEND = `/universities`;
  return axios.post(URL_BACKEND, universityData);
};
const findUniversityById = (id) => {
  const URL_BACKEND = `/universities/${id}`;//backtick
  return axios.get(URL_BACKEND);
}
const updateUniversity = (id, universityData ) => {
  const URL_BACKEND = `/universities/${id}`;
  return axios.put(URL_BACKEND, universityData);
};

export {
  getAllUniversities,deleteUniversity,addUniversity,findUniversityById,updateUniversity
}