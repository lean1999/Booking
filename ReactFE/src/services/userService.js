import axios from "../axios";

const handleLoginAPI = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  console.log("data:", data);
  return axios.post("/api/create-new-users", data);
};
const deleteUserService = (userId) => {
  return axios.delete("/api/delete-users", { data: { id: userId } });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-users", inputData);
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
export {
  handleLoginAPI,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
};
