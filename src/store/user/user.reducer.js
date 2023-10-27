import { USER_ACTION_TYPES } from "./user.types";
/*
export const USER_ACTION_TYPES = {
    FETCH_INFO_START: "user/FETCH_INFO_START",
    FETCH_INFO_SUCCESS: "user/FETCH_INFO_SUCCESS",
    FETCH_INFO_ERROR: "user/FETCH_INFO_ERROR",
    GET_JWT_START: "user/GET_JWT_START",
    GET_JWT_SUCCESS: "user/GET_JWT_SUCCESS",
    GET_JWT_ERROR: "user/GET_JWT_ERROR",
  };
For the schema: 
const currentUser = {
    jwtToken: "",
    userId: "",
    email: "",
    dateJoined: "",
};
*/

const initialState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

export const userReducer = (state = initialState, action) => {
  if (action.type == USER_ACTION_TYPES.GET_JWT_START) {
    return { ...state, isLoading: true };
  }
  if (action.type == USER_ACTION_TYPES.GET_JWT_ERROR) {
    return { ...state, error: action.payload, isLoading: false };
  }
  if (action.type == USER_ACTION_TYPES.GET_JWT_SUCCESS) {
    if (!state.currentUser) {
      return {
        error: null,
        isLoading: false,
        currentUser: {
          jwtToken: action.payload,
        },
      };
    } else {
      return {
        error: null,
        isLoading: false,
        currentUser: {
          ...state.currentUser,
          jwtToken: action.payload,
        },
      };
    }
  }
  if (action.type == USER_ACTION_TYPES.FETCH_INFO_START) {
    return { ...state, isLoading: true };
  }
  if (action.type == USER_ACTION_TYPES.FETCH_INFO_ERROR) {
    return { ...state, error: action.payload, isLoading: false };
  }
  if (action.type == USER_ACTION_TYPES.FETCH_INFO_SUCCESS) {
    const { dateJoined, userId, email } = action.payload;
    if (!state.currentUser) {
      return {
        error: null,
        isLoading: false,
        currentUser: {
          dateJoined,
          userId,
          email,
        },
      };
    } else {
      return {
        error: null,
        isLoading: false,
        currentUser: {
          ...state.currentUser,
          dateJoined,
          userId,
          email,
        },
      };
    }
  }
  if (action.type == USER_ACTION_TYPES.SIGNOUT) {
    return {
      currentUser: null,
      error: null,
      isLoading: false,
    };
  }
  return state;
};
