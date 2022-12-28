import axios from "../axios";

const handleLoginAPI = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
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

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctorService = (data) => {
  return axios.post(`/api/save-info-doctors`, data);
};
const getDetailInfoDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};
const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientAppoiment = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};
const postVerifyBookAppoiment = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};

const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};
const getAllSpecialty = () => {
  return axios.get(`/api/get-specialty`);
};

const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

const createNewClinic = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
};

const getAllClinic = () => {
  return axios.get(`/api/get-clinic`);
};

const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

//patient
const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const postSendRemedy = (data) => {
  return axios.post(`/api/send-remedy`, data);
};

const getListPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-dt?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const getAllPatientAccept = (dataType) => {
  return axios.get(`/api/get-all-patient-accept?type=${dataType}`);
};

const getAllListPatient = (dataType) => {
  return axios.get(`/api/get-all-list-patient?type=${dataType}`);
};

const postSendPrescription = (data) => {
  return axios.post(`/api/send-prescription`, data);
};
export {
  handleLoginAPI,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllCodeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postPatientAppoiment,
  postVerifyBookAppoiment,
  createNewSpecialty,
  getAllSpecialty,
  getAllDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getAllDetailClinicById,
  getAllPatientForDoctor,
  postSendRemedy,
  getListPatientForDoctor,
  getAllPatientAccept,
  getAllListPatient,
  postSendPrescription,
};
