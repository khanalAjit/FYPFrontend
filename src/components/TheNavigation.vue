<template>
  <div id="navigation">
    <div class="logo">
      <img src="../assets/logo.png" alt="" />
    </div>
    <div class="nav-list">
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
#navigation {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 50px;
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0 20px 0 0;
    li,
    a,
    button {
      text-decoration: none;
      color: rgb(0, 0, 0);
      font-size: 1.5rem;
      padding: 2px 10px;
      cursor: pointer;
      &:hover {
        color: #4b94be;
      }
    }
    a,
    button:hover,
    a,
    button:active,
    a,
    button.router-link-active {
      color: rgb(51, 178, 237);
    }
  }
}
.logo {
  flex: 20%;
  img {
    height: 100px;
    margin: 0 0 0 50px;
  }
}
</style>
