import UserActionTypes from "./user.types";

// Defining Redux Actions
export const signInStart = () => ({
  type: UserActionTypes.SIGN_IN_START,
});

export const signInSuccess = () => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const setUserToNull = () => ({
  type: UserActionTypes.SET_USER_TO_NULL,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const updateLocalUser = (user) => ({
  type: UserActionTypes.UPDATE_LOCAL_USER,
  payload: user,
});

export const updateUserAdminChats = (id) => ({
  type: UserActionTypes.UPDATE_USER_ADMINCHATS,
  payload: id,
});
