import axios from "./axios.customize.js";

const getEnrollmentByTeacherId = (id) => {
  const URL_BACKEND = `/enrollments/getEnrollmentByTeacherId/${id}`;//backtick
  return axios.get(URL_BACKEND);

}
export {
  getEnrollmentByTeacherId
}