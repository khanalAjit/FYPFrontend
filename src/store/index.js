import { createStore } from "vuex";
import caretakersModule from "./modules/caretakers/index.js";
import adoptionPostsModule from "./modules/adoptions/index.js";
import messageModule from "./modules/messages/index.js";
import requestModule from "./modules/requests/index.js";
import authModule from "./modules/auth/index";
const store = createStore({
  modules: {
    caretakers: caretakersModule,
    adoptions: adoptionPostsModule,
    requests: requestModule,
    auth: authModule,
    messages: messageModule,
  },
});

export default store;
