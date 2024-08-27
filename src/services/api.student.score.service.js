import axios from "./axios.customize.js";

const getViewStudentScore = (studentId) => {
  const URL_BACKEND = `/StudentScore/${studentId}`;
  return axios.get(URL_BACKEND);
}
const insertStudentScore=(request)=>{
  const URL_BACKEND = `/StudentScore`;
  return axios.post(URL_BACKEND,request);
}
export {
  getViewStudentScore,
  insertStudentScore
}