export default {
  requests(state) {
    return state.requests;
  },
  /* isUnresponded(_, getters, _2, rootGetters) {
    const requests = getters.requests;
    const userId = rootGetters.userId;
    console.log(userId);

    requests.forEach((req) => {
      if (req.status === "pending") {
        return true;
      }
      return false;
    });
  }, */
};
