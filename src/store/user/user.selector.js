export const selectJwtToken = (state) => state.user.jwtToken;
export const selectUserInfo = (state) => {
  return {
    state: state.user.userId,
    dateJoined: state.user.dateJoined,
    email: state.user.email,
  };
};
