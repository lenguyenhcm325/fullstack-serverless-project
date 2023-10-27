import { USER_ACTION_TYPES } from "./user.types";
// export const USER_ACTION_TYPES = {
//     FETCH_INFO_START: "user/FETCH_INFO_START",
//     FETCH_INFO_SUCCESS: "user/FETCH_INFO_SUCCESS",
//     FETCH_INFO_ERROR: "user/FETCH_INFO_ERROR",
//     GET_JWT_START: "user/GET_JWT_START",
//     GET_JWT_SUCCESS: "user/GET_JWT_SUCCESS",
//     GET_JWT_ERROR: "user/GET_JWT_ERROR",
//   };

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
