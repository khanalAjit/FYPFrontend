export default {
  addProfile(state, payload) {
    console.log("mutation ko data");
    console.log(payload);
    console.log("Caretakers available in mutation");
    console.log(state.caretakers);
    state.caretakers.push(payload);
  },
  setCaretakers(state, payload) {
    state.caretakers = payload;
  },
  setProfile(state, payload) {
    state.profile = payload;
  },
};
