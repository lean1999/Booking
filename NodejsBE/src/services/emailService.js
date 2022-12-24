require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, //  ethereal password
    },
  });
  let getBodyHTMLEmail = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
      result = `<h3>Xin chào  ${dataSend.patientName} !</h3>
      <p> Bạn nhận được Mail này vì đã đặt lịch Online thành công trên trang BookingDoctor</p>
      <p>Thông tin đặt lịch khám bệnh:</p>
      <div><b>Thời gian: ${dataSend.time}</b></div>
      <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
      <p>Nếu các thông tin trên là đúng sự thật vui lòng click vào đường link bên dưới để hoàn tất thủ tục đặt lịch khám bệnh.</p>
      <div>
      <a href=${dataSend.redirectLink} target="_blank"> Click here!</a>
      </div>
      <div>Xin chân thành cảm ơn</div>
      `;
    }
    if (dataSend.language === "en") {
      result = `<h3>Dear  ${dataSend.patientName} !</h3>
      <p> 
      You received this email because you have successfully booked an online appointment on BookingDoctor</p>
      <p>
      Information to schedule an appointment:</p>
      <div><b>Time: ${dataSend.time}</b></div>
      <div><b>Doctor: ${dataSend.doctorName}</b></div>
      <p>
      If the above information is true, please click on the link below to complete the procedure to book an appointment.</p>
      <div>
      <a href=${dataSend.redirectLink} target="_blank"> Click here!</a>
      </div>
      <div>
      Sincerely thank !</div>
      
      `;
    }
    return result;
  };
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Booking Doctor 👻" <nabikun1001@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông Tin Đặt Lịch Khám Bệnh ✔", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `<h3>Xin chào  ${dataSend.patientName}!</h3>
    <p> Bạn nhận được Mail này vì đã đặt lịch Online thành công trên trang BookingDoctor</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    
    <p>Thông tin đơn thuốc / hóa đơn được gửi trong File đính kèm .</p>
  
    <div>Xin chân thành cảm ơn</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `<h3>Dear ${dataSend.patientName}!</h3>
    <p> 
    You received this email because you have successfully booked an online appointment on BookingDoctor</p>
    <p>
    <p> Prescription/invoice information is sent in Attachment</p>
    <div>
    Sincerely thank !</div>
    
    `;
  }
  return result;
};
let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, //  ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: '"Booking Doctor 👻" <nabikun1001@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết Quả Đặt Lịch Khám Bệnh ✔", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
          {
            filename: `remedy-${dataSend.patientId
              }-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64,")[1],
            encoding: "base64",
            contentType: 'application/pdf'
          },
        ],
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
};
