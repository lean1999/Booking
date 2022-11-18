import db from "../models/index";

var bcrypt = require("bcryptjs");

var salt = bcrypt.genSaltSync(10);

let createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        id: data.id,
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });

      resolve("create a new user");
    } catch (err) {
      reject();
      console.error;
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
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
};
let getUserInfoByID = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: userId,
        },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
let updateUserData = (updateData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: updateData.id },
      });
      if (user) {
        user.firstName = updateData.firstName;
        user.lastName = updateData.lastName;
        user.address = updateData.address;
        user.phoneNumber = updateData.phoneNumber;
        await user.save();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve({});
      }
    } catch (err) {}
  });
};

let deleteUserByID = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: false,
      });
      if (user) {
        await db.User.destroy({
          where: { id: userId },
        });
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createUser: createUser,
  hashUserPassword: hashUserPassword,
  getAllUser: getAllUser,
  getUserInfoByID: getUserInfoByID,
  updateUserData: updateUserData,
  deleteUserByID: deleteUserByID,
};
