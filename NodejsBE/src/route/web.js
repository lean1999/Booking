import express from "express";
import homeControllers from "../controllers/homeControllers";
import userController from "../controllers/userController";
import doctorControllers from "../controllers/doctorControllers";
import patientController from "../controllers/patientController";
import specialtyControllers from "../controllers/specialtyControllers";
import clinicControllers from "../controllers/clinicControllers";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeControllers.getHomePage);
  router.get("/crud", homeControllers.getCRUD);
  router.post("/post-crud", homeControllers.postCRUD);
  router.get("/get-crud", homeControllers.disPlayGetCRUD);
  router.get("/edit-crud", homeControllers.getEditCRUD);
  router.post("/put-crud", homeControllers.putCRUD);
  router.get("/delete-crud", homeControllers.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-users", userController.handleCreateNewUser);
  router.put("/api/edit-users", userController.handleEditUsers);
  router.delete("/api/delete-users", userController.handleDeleteUser);

  router.get("/api/allcode", userController.getAllCode);
  router.get("/api/top-doctor-home", doctorControllers.getDoctorHome);
  router.get("/api/get-all-doctors", doctorControllers.getAllDoctors);
  router.post("/api/save-info-doctors", doctorControllers.postInfoDoctors);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorControllers.getDetailDoctorById
  );
  router.post(
    "/api/bulk-create-schedule",
    doctorControllers.bulkCreateSchedule
  );

  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorControllers.getScheduleByDate
  );
  router.get(
    "/api/get-extra-info-doctor-by-id",
    doctorControllers.getExtarInforDoctorById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorControllers.getProfileDoctorById
  );

  router.get(
    "/api/get-list-patient-for-doctor",
    doctorControllers.getListPatientsForDoctor
  );

  // Booking
  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  );

  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );

  //Specialty
  router.post(
    "/api/create-new-specialty",
    specialtyControllers.createSpecialty
  );
  router.get("/api/get-specialty", specialtyControllers.getAllSpecialty);
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyControllers.getDetailSpecialtyById
  );

  // Clinic

  router.post("/api/create-new-clinic", clinicControllers.createClinic);
  router.get("/api/get-clinic", clinicControllers.getAllClinic);
  router.get(
    "/api/get-detail-clinic-by-id",
    clinicControllers.getDetailClinicById
  );

  router.post("/api/send-remedy", doctorControllers.sendRemedy);

  router.get(
    "/api/get-list-patient-for-dt",
    doctorControllers.getListPatientsForDt
  );
  router.get("/api/get-all-list-patient", doctorControllers.getAllListPatient);

  router.get(
    "/api/get-all-patient-accept",
    doctorControllers.getaAllPatientAccept
  );

  router.post("/api/send-prescription", doctorControllers.sendPrescription);
  return app.use("/", router);
};
module.exports = initWebRoutes;
