import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  position: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      console.log("fetch", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      console.log("fetch success", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      console.log("fetch fail", action);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
