import axios from "./axios.customize.js";

const getAllCoursePaging = (pageNo, pageSize, sortBy) => {
  const URL_BACKEND = `courses?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`;
  return axios.get(URL_BACKEND);
}
const deleteCourse = (id) => {
  const URL_BACKEND = `/courses/${id}`;//backtick
  return axios.delete(URL_BACKEND);
}
const addCourse = (request) => {
  const URL_BACKEND = `/courses`;
  return axios.post(URL_BACKEND, request);
};
const updateCourse = (id, request) => {
  const URL_BACKEND = `/courses/${id}`;
  return axios.put(URL_BACKEND, request);
};
const getCourseById = (id) => {
  const URL_BACKEND = `/courses/${id}`;//backtick
  return axios.get(URL_BACKEND);
}

export {
  getAllCoursePaging,
  deleteCourse,
  addCourse,
  updateCourse,
  getCourseById
}

