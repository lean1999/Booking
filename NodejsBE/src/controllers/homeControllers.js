import db from "../models/index";
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
    // {
    //   data: JSON.stringify(data),
    // }
  } catch (e) {
    console.log(e);
  }
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CRUDService.createUser(req.body);
  console.log(message);
  return res.send("post crud");
};
let disPlayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render("displaycrud.ejs", {
    dataTable: data,
  });
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoByID(userId);

    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("User not found");
  }
};

let putCRUD = async (req, res) => {
  let updateData = req.body;
  let allUsers = await CRUDService.updateUserData(updateData);
  return res.render("displaycrud.ejs", {
    dataTable: allUsers,
  });
};
let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUserByID(id);
    return res.send("delete successfully");
  } else {
    return res.send("user not found");
  }
};
module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  disPlayGetCRUD: disPlayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
