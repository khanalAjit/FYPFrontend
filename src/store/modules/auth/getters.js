export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isLoggedIn(state) {
    return !!state.token;
  },
  isAdmin(state) {
    return !!state.admins;
  },
};
