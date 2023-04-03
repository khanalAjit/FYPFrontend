import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";
import HomePage from "./components/pages/HomePage.vue";
import MyProfile from "./components/pages/MyProfile.vue";
import TheServices from "./components/pages/TheServices.vue";
import AdoptMe from "./components/pages/AdoptMe.vue";
import TheCaretakers from "./components/pages/TheCaretakers.vue";
import TheLogin from "./components/pages/TheLogin.vue";
import RegisterNow from "./components/pages/RegisterNow.vue";
import ContactCaretaker from "./components/pages/ContactCaretaker.vue";
import MyRequests from "./components/pages/MyRequests.vue";
import ContactRequests from "./components/pages/ContactRequests.vue";
import VerifyProfile from "./components/pages/VerifyProfile.vue";
import NotFound from "./components/pages/NotFound.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/myprofile", component: MyProfile, meta: { requiresAuth: true } },
    { path: "/services", component: TheServices, meta: { requiresAuth: true } },
    { path: "/adoptme", component: AdoptMe, meta: { requiresAuth: true } },
    {
      path: "/caretakers",
      component: TheCaretakers,
      meta: { requiresAuth: true },
    },
    {
      path: "/caretakers/:id/contact",
      component: ContactCaretaker,
      meta: { requiresAuth: true },
    },
    { path: "/login", component: TheLogin, meta: { requiresUnAuth: true } },
    {
      path: "/register",
      component: RegisterNow,
      meta: { requiresUnAuth: true },
    },
    {
      path: "/requests",
      component: ContactRequests,
      meta: { requiresAuth: true },
    },
    {
      path: "/myservices",
      component: MyRequests,
      meta: { requiresAuth: true },
    },
    {
      path: "/applyforverification",
      component: VerifyProfile,
      meta: { requiresAuth: true },
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    next("/login");
  } else if (to.meta.requiresUnAuth && store.getters.isLoggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
