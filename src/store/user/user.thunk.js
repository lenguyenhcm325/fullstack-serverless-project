import {
  getJwtError,
  getJwtSuccess,
  getJwtStart,
  fetchInfoError,
  fetchInfoSuccess,
  fetchInfoStart,
} from "./user.action";

import { Auth } from "aws-amplify";
const apiEndpoint = import.meta.env.VITE_REST_ENDPOINT;
export const handleGetJwt = () => async (dispatch) => {
  try {
    dispatch(getJwtStart());
    const token = (await Auth.currentSession()).getIdToken().getJwtToken();
    dispatch(getJwtSuccess(token));
  } catch (err) {
    if (err.name == "NoCurrentSession") {
      dispatch(getJwtError("No current session available."));
    } else if (err.name == "NetworkError") {
      dispatch(getJwtError("Network error occurred."));
    } else if (err.name == "NotAuthenticated") {
      dispatch(getJwtError("User is not authenticated."));
    } else {
      dispatch(getJwtError("An unexpected error occurred."));
    }
  }
};

export const handleFetchInfo = () => async (dispatch) => {
  dispatch(fetchInfoStart());
  let userId = "";
  let fetchResult;
  let userObject = {};
  try {
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    });
    userId = user.attributes.sub;
  } catch (err) {
    dispatch(fetchInfoError(err.code));
  }
  try {
    const response = await fetch(`${apiEndpoint}/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      const errorStatusCode = error.status;
      throw new Error(errorStatusCode);
    }
    fetchResult = await response.json();
  } catch (err) {
    if (Number(err.message) === 404) {
      dispatch(fetchInfoError("User can't be found"));
    } else if (Number(err.message) === 429) {
      dispatch(fetchInfoError("Too many requests, please try again later"));
    } else if (Number(err.message) === 500) {
      dispatch(fetchInfoError("Internal server error"));
    } else if (Number(err.message) === 401) {
      dispatch(fetchInfoError("Unauthorized"));
    } else if (Number(err.message) == 502) {
      dispatch(
        fetchInfoError("The backend server didn't return a valid response")
      );
    } else if (Number(err.message) === 504) {
      dispatch(fetchInfoError("Gateway timeout"));
    } else {
      dispatch(fetchInfoError("An unexpected error occurred."));
    }
  }
  dispatch(
    fetchInfoSuccess({
      email: fetchResult.email.S,
      userId: fetchResult.userId.S,
      dateJoined: fetchResult.dateJoined.S,
    })
  );
};
