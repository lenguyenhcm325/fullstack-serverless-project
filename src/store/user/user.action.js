import { USER_ACTION_TYPES } from "./user.types";

export const fetchInfoStart = () => {
  return {
    type: USER_ACTION_TYPES.FETCH_INFO_START,
  };
};

export const getJwtStart = () => {
  return {
    type: USER_ACTION_TYPES.GET_JWT_START,
  };
};

export const fetchInfoError = (error) => {
  return {
    type: USER_ACTION_TYPES.FETCH_INFO_ERROR,
    payload: error,
  };
};

export const getJwtError = (error) => {
  return {
    type: USER_ACTION_TYPES.GET_JWT_ERROR,
    payload: error,
  };
};

export const fetchInfoSuccess = (info) => {
  return {
    type: USER_ACTION_TYPES.FETCH_INFO_SUCCESS,
    payload: info,
  };
};

export const getJwtSuccess = (token) => {
  return {
    type: USER_ACTION_TYPES.GET_JWT_SUCCESS,
    payload: token,
  };
};

export const signOut = () => {
  return {
    type: USER_ACTION_TYPES.SIGNOUT,
  };
};
