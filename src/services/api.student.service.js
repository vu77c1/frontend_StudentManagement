import axios from "./axios.customize.js";

const getAllStudents = (pageNo, pageSize, search = '') => {
  const URL_BACKEND = `/students/getStudent`;
  const params = {
    pageNo,
    pageSize,
    search
  };
  return axios.get(URL_BACKEND, {params});
};
const getAllStudentsPaging = (pageNo, pageSize, search) => {
  const URL_BACKEND = `/students/getStudentList?pageNo=${pageNo}&pageSize=${pageSize}&search=${search}`;
  return axios.get(URL_BACKEND);
}

const deleteStudent = (id) => {
  const URL_BACKEND = `/students/${id}`;//backtick
  return axios.delete(URL_BACKEND);
}
const addStudent = (studentData) => {
  const URL_BACKEND = `/students`;
  return axios.post(URL_BACKEND, studentData);
};
const findStudentById = (id) => {
  const URL_BACKEND = `/students/${id}`;//backtick
  return axios.get(URL_BACKEND);
}
const updateStudent = (id, studentData) => {
  const URL_BACKEND = `/students/${id}`;
  return axios.put(URL_BACKEND, studentData);
};
const viewStudentProfile = (id) => {
  const URL_BACKEND = `/students/viewProfile/${id}`;//backtick
  return axios.get(URL_BACKEND);
}
const viewStudentImage = async (filename) => {
  try {
    const URL_BACKEND = `/students/images/${filename}`;
    const response = await axios.get(URL_BACKEND);

    // Giả sử phản hồi chứa URL hình ảnh trong dữ liệu
    return response.request.responseURL; // Điều chỉnh theo cấu trúc phản hồi API của bạn
  } catch (error) {
    console.error("Lỗi khi lấy hình ảnh:", error);
    return "https://via.placeholder.com/128"; // Hình ảnh dự phòng
  }
};
const uploadImage = async (username, file) => {
  const URL_BACKEND = `/students/upload/${username}`;

  const formData = new FormData();
  formData.append('files', file); // 'files' is the key expected by the server

  try {
    const response = await axios.post(URL_BACKEND, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Adjust this based on the server's response structure
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

const updateProfile = (username, profileData) => {
  const URL_BACKEND = `/students/updateProfile/${username}`;
  return axios.post(URL_BACKEND, profileData);
}

export {
  getAllStudents,
  deleteStudent,
  addStudent,
  findStudentById,
  updateStudent,
  getAllStudentsPaging,
  viewStudentProfile,
  viewStudentImage,
  uploadImage, updateProfile
}