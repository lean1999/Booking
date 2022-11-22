import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      message: "missing parameter",
      err: "1",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  console.log(userData);
  return res.status(200).json({
    err: userData.err,
    message: userData.errMessage,
    user: userData.user ? userData.user : { a: "abc" },
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;

  if (!id) {
    return res.status(300).json({
      err: 1,
      errMessage: "missing for parameter",
      users,
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    err: 0,
    errMessage: "success",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
};
let handleEditUsers = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      err: 1,
      message: "Missing required parameters!",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeSever(req.query.type);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log("Err code", error);
    return res.status(200).json({
      error: 1,
      message: "Err code Server",
    });
  }
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUsers: handleEditUsers,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
};
