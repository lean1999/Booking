// import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
// import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

// const locationHelper = locationHelperBuilder({});

// export const userIsAuthenticated = connectedRouterRedirect({
//   authenticatedSelector: (state) => state.user.isLoggedIn,
//   wrapperDisplayName: "UserIsAuthenticated",
//   redirectPath: "/login",
// });

// export const userIsNotAuthenticated = connectedRouterRedirect({
//   // Want to redirect the user when they are authenticated
//   authenticatedSelector: (state) => !state.user.isLoggedIn,
//   wrapperDisplayName: "UserIsNotAuthenticated",
//   redirectPath: (state, ownProps) =>
//     locationHelper.getRedirectQueryParam(ownProps) || "/",
//   allowRedirectBack: false,
// });

import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state) => state.user.isLoggedIn,
  wrapperDisplayName: "UserIsAuthenticated",
  redirectPath: "/",
  // redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/login',
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  // Want to redirect the user when they are authenticated
  authenticatedSelector: (state) => !state.user.isLoggedIn,
  wrapperDisplayName: "UserIsNotAuthenticated",
  // link khi ddawng nhap zo he thong
  // redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/system',
  // moi
  redirectPath: "/admin",
  allowRedirectBack: false,
});
