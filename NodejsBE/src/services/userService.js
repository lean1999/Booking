import db from "../models/index";

var bcrypt = require("bcryptjs");

var salt = bcrypt.genSaltSync(10);

var bcrypt = require("bcryptjs");

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExit = await checkUserEmail(email);
      if (isExit) {
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
          ],
          where: { email: email },
          raw: true,
        });

        if (user) {
          let check = await bcrypt.compareSync(password, user.password); // false
          if (check) {
            userData.err = 0;
            userData.errMessage = ``;
            console.log(user);
            delete user.password;
            userData.user = user;
          } else {
            userData.err = 3;
            userData.errMess1age = `your login found`;
          }
        } else {
          userData.err = 2;
          userData.errMessage = `User not found`;
        }
      } else {
        userData.err = 1;
        userData.errMessage = `your email isn't exist in your system, plz check your email`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (err) {
      reject(err);
    }
  });
};
let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (err) {
      reject(err);
    }
  });
};
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "abc";
      if (userId === "All") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }

      if (userId && userId !== "All") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          err: 1,
          message: "Your email used at system, plz  try another email",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.avatar,
        });

        resolve({
          err: 0,
          message: "OK",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.gender || !data.positionId) {
        //
        resolve({
          error: 2,
          codeMessage: `Missing required parameters`,
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.address = data.address),
          (user.phoneNumber = data.phoneNumber),
          (user.gender = data.gender),
          (user.roleId = data.roleId),
          (user.positionId = data.positionId),
          (user.image = data.avatar);
        await user.save();
        resolve({
          err: 0,
          message: `update user success`,
        });
      } else {
        resolve({
          err: 1,
          message: `user's not found`,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (!user) {
      resolve({
        err: 2,
        errMessage: `The user ins't exit`,
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      err: 0,
      message: `Delete successfully`,
    });
  });
};

let getAllCodeSever = (inputType) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputType) {
        resolve({
          error: 1,
          errorMessage: "Missing req parameter",
        });
      } else {
        let res = {};
        let allCode = await db.Allcode.findAll({
          where: { type: inputType },
        });
        res.errCode = 0;
        res.data = allCode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getAllCodeSever: getAllCodeSever,
};
