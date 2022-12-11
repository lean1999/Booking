import db from "../models/index";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

require("dotenv").config();

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

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

      let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      await emailService.sendSimpleEmail({
        receiverEmail: data.email,
        patientName: data.fullName,
        time: data.timeString,
        doctorName: data.doctorName,
        language: data.language,
        redirectLink: buildUrlEmail(data.doctorId, token),
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
            token: token,
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

let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errorMessage: "Update the appointment successfully",
          });
        } else {
          resolve({
            error: 2,
            errorMessage: "Appointment has been activated or does not exist",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postBookAppointmentService: postBookAppointmentService,
  postVerifyBookAppointment: postVerifyBookAppointment,
};
