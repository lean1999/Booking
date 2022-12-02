import doctorService from "../services/doctorService";

let getDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;

  try {
    let response = await doctorService.getTopDoctorHome(+limit);
    console.log(response);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);

    return res.status(200).json({
      errCode: -1,
      message: "Err from server .....",
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    console.log(doctors);
    return res.status(200).json(doctors);
  } catch (err) {
    console.log(err);
    res.status(200).json({
      errCode: -1,
      message: "Error from sever ....",
    });
  }
};
let postInfoDoctors = async (req, res) => {
  try {
    let response = await doctorService.saveDetailsInfoDoctor(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(200).json({
      errCode: -1,
      message: "Error from sever ....",
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  try {
    let info = await doctorService.getDetailDoctorById(req.query.id);
    res.status(200).json(info);
  } catch (e) {
    console.log(e);
    res.status(200).json({
      errCode: -1,
      message: "Error from sever ....",
    });
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let info = await doctorService.bulkCreateSchedule(req.body);
    res.status(200).json(info);
  } catch (e) {
    console.log(e);
    res.status(200).json({
      errCode: -1,
      message: "Error from sever ....",
    });
  }
};
let getScheduleByDate = async (req, res) => {
  try {
    let info = await doctorService.getScheduleByDate(
      req.query.doctorId,
      req.query.date
    );
    res.status(200).json(info);
  } catch (e) {
    console.log(e);
    res.status(200).json({
      errCode: -1,
      message: "Error from sever ....",
    });
  }
};
module.exports = {
  getDoctorHome: getDoctorHome,
  getAllDoctors: getAllDoctors,
  postInfoDoctors: postInfoDoctors,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
};
