<template>
  <div id="navigation-mobile">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/myprofile">My Profile</router-link>
      </li>
      <li>
        <router-link to="/services">Services</router-link>
      </li>
      <li>
        <router-link to="/adoptme">Adopt Me</router-link>
      </li>
      <li>
        <router-link to="/caretakers">Caretakers</router-link>
      </li>
      <li v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-if="isLoggedIn">
        <button @click="logout">Logout</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss" scoped>
#navigation-mobile {
  padding: 20px 0 0 0;
  ul {
    list-style: none;
    width: 200px;
    padding-left: 40px;
    li,
    a,
    button {
      text-decoration: none;
      color: #fff;
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 20px;

      cursor: pointer;
      &:hover {
        color: #111;
      }
    }
    a,
    button:hover,
    a,
    button:active,
    a.router-link-active {
      color: rgb(86, 203, 218);
    }
  }
}
</style>
