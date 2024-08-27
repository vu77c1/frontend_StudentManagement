import axios from "./axios.customize.js";

const getAllDepartment = () => {
  const URL_BACKEND = `/departments`;
  return axios.get(URL_BACKEND);
}
const getAllDepartmentPaging = (pageNo, pageSize, search) => {
  const URL_BACKEND = `/departments/getAllDepartments?pageNo=${pageNo}&pageSize=${pageSize}&search=${search}`;
  return axios.get(URL_BACKEND);
}
const deleteDepartment = (id) => {
  const URL_BACKEND = `/departments/${id}`;//backtick
  return axios.delete(URL_BACKEND);
}
const addDepartment = (departmentData) => {
  const URL_BACKEND = `/departments`;
  return axios.post(URL_BACKEND, departmentData);
};
const getDepartmentByIdAPI = (id) => {
  const URL_BACKEND = `/departments/${id}`;//backtick
  return axios.get(URL_BACKEND);
}
const updateDepartment = (id, departmentData) => {
  const URL_BACKEND = `/departments/${id}`;
  return axios.put(URL_BACKEND, departmentData);
};

export {
  getAllDepartment,
  getAllDepartmentPaging,
  deleteDepartment,
  addDepartment,
  updateDepartment,
  getDepartmentByIdAPI

}