import clinicService from "../services/clinicService";

let createClinic = async (req, res) => {
  try {
    let info = await clinicService.createClinics(req.body);
    res.status(200).json(info);
  } catch (e) {
    console.log(e);
    res.status(200).json({
      errCode: -1,
      message: "Error from sever ....",
    });
  }
};

let getAllClinic = async (req, res) => {
  try {
    let info = await clinicService.getAllClinic();
    res.status(200).json(info);
  } catch (e) {
    console.log(e);
    res.status(200).json({
      errCode: -1,
      message: "Error from sever ....",
    });
  }
};
let getDetailClinicById = async (req, res) => {
  try {
    let info = await clinicService.getDetailClinicById(req.query.id);
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
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
};
