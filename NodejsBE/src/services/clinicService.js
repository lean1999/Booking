const db = require("../models");

let createClinics = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.address ||
        !data.name ||
        !data.descriptionMarkdown ||
        !data.descriptionHTML ||
        !data.imageBase64
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
          image: data.imageBase64,
        });
        resolve({
          errCode: 0,
          errMessage: "successfully",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "successfully",
        data,
      });
    } catch (err) {
      reject(err);
    }
  });
};

let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });
        if (data) {
          let doctorClinic = [];

          doctorClinic = await db.Doctor_Info.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });

          data.doctorClinic = doctorClinic;
        } else data = {};
        resolve({
          errCode: 0,
          errMessage: "successfully",
          data,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  createClinics: createClinics,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
};
