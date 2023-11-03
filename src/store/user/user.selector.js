export const selectJwtToken = (state) => state.user.currentUser.jwtToken;
export const selectUserInfo = (state) => {
  if (state.user.currentUser) {
    return {
      userId: state.user.currentUser.userId,
      dateJoined: state.user.currentUser.dateJoined,
      email: state.user.currentUser.email,
    };
  } else {
    return null;
  }
};
