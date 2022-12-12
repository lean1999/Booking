import specialtyService from "../services/specialtyService";

let createSpecialty = async (req, res) => {
  try {
    let info = await specialtyService.createSpecialty(req.body);
    res.status(200).json(info);
  } catch (e) {
    console.log(e);
    res.status(200).json({
      errCode: -1,
      message: "Error from sever ....",
    });
  }
};

let getAllSpecialty = async (req, res) => {
  try {
    let info = await specialtyService.getAllSpecialty();
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
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
};
