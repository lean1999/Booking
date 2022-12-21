import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  editUserService,
  deleteUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getAllSpecialty,
  getAllClinic,
} from "../../services/userService";
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.SAVE_ALL_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({ type: actionTypes.SAVE_ALL_SCHEDULE_TIME_FAILED });
        console.log("SAVE_ALL_SCHEDULE_TIME_FAILED");
      }
    } catch (e) {
      console.log("SAVE_ALL_SCHEDULE_TIME_FAILED", e);
      dispatch({ type: actionTypes.SAVE_ALL_SCHEDULE_TIME_FAILED });
    }
  };
};

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
        toast.success("Save Info Doctor Success");
      } else {
        dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED });
        toast.error("SAVE_ALL_SCHEDULE_TIME__FAILED");
      }
    } catch (e) {
      console.log("fetchTopDoctorFailed", e);
      dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED });
      toast.error("SAVE_ALL_SCHEDULE_TIME__FAILED");
    }
  };
};

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctor: res.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILED });
      }
    } catch (e) {
      console.log("fetchTopDoctorFailed", e);
      dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILED });
    }
  };
};

export const fetchTopDoctorSuccess = () => ({
  type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
});
export const fetchTopDoctorFailed = () => ({
  type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
});

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.err === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAILED });
      }
    } catch (e) {
      console.log("fetchALLDoctorFailed", e);
      dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAILED });
    }
  };
};
//Gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      console.log("err gender", e);
      dispatch(fetchGenderFailed());
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const getRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(fetchRequiredDoctorInfoSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInfoFailed());
      }
    } catch (e) {
      console.log("err gender", e);
      dispatch(fetchRequiredDoctorInfoFailed());
    }
  };
};
export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  data: allRequiredData,
});
export const fetchRequiredDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});

//Position
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      console.log("err position", e);
      dispatch(fetchPositionFailed());
    }
  };
};
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      console.log("err role", e);
      dispatch(fetchRoleFailed());
    }
  };
};

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.err === 0) {
        dispatch(saveUserSuccess());
        toast.success("Create a new User Success");
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("err create user", e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("All");
      if (res && res.err === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailed());
        toast.error(" Fetch all User error!");
      }
    } catch (e) {
      console.log("fetchAllUsersFailed", e);
      toast.error(" Fetch all User error!");
      dispatch(fetchAllUsersFailed());
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const DeleteUsersStart = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.err === 0) {
        dispatch(DeleteUsersSuccess());
        dispatch(fetchAllUsersStart());
        toast.success("Delete a User Success");
      } else {
        toast.error("Delete a User error!");
        dispatch(DeleteUsersFailed());
      }
    } catch (e) {
      console.log("DeleteUsersFailed", e);
      dispatch(DeleteUsersFailed());
    }
  };
};

export const DeleteUsersSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const DeleteUsersFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);

      if (res && res.err === 0) {
        dispatch(editUsersSuccess());
        dispatch(fetchAllUsersStart());
        toast.success("Update User Success");
      } else {
        toast.error("Update User error!");
        dispatch(editUsersFailed());
      }
    } catch (e) {
      console.log("Update Users Failed", e);
      dispatch(editUsersFailed());
    }
  };
};

export const editUsersSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUsersFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});
