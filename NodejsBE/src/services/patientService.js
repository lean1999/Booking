import db from "../models/index";
import emailService from "./emailService";
require("dotenv").config();

let postBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // if (!data.email || !data.doctorId || !data.timeType || !data.date) {
      //   resolve({
      //     errCode: 1,
      //     errMessage: "Missing parameter",
      //   });
      // } else {
      //   // upsert patient
      //   let user = await db.User.findOrCreate({
      //     where: { email: data.email },
      //     defaults: {
      //       email: data.email,
      //       roleId: "R3",
      //     },
      //   });
      //   await emailService.sendSimpleEmail(data.email);
      //   console.log("check usser", user);
      //   //create a booking record
      //   if (user && user[0]) {
      //     await db.Booking.findOrCreate({
      //       where: { patientId: user[0].id },
      //       defaults: {
      //         statusId: "S1",
      //         doctorId: data.doctorId,
      //         patientId: user[0].id,
      //         date: data.date,
      //         timeType: data.timeType,
      //       },
      //     });
      //   }
      //   resolve({
      //     errCode: 0,
      //     errMessage: "Save infor patient success",
      //   });
      // }
      // upsert patient

      resolve({
        data,
      });

      await emailService.sendSimpleEmail({
        receiverEmail: data.email,
        patientName: data.fullName,
        time: data.timeString,
        doctorName: data.doctorName,
        language: data.language,
        redirectLink: "https://www.youtube.com/",
      });
      let user = await db.User.findOrCreate({
        where: { email: data.email },
        defaults: {
          email: data.email,
          roleId: "R3",
        },
      });
      console.log("check usser", user);
      //create a booking record
      if (user && user[0]) {
        await db.Booking.findOrCreate({
          where: { patientId: user[0].id },
          defaults: {
            statusId: "S1",
            doctorId: data.doctorId,
            patientId: user[0].id,
            date: data.date,
            timeType: data.timeType,
          },
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Save infor patient success",
      });
    } catch (e) {
      reject(e);
      console.log(e);
    }
  });
};
module.exports = {
  postBookAppointmentService: postBookAppointmentService,
};
