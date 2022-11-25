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
module.exports = {
  getDoctorHome: getDoctorHome,
  getAllDoctors: getAllDoctors,
};
