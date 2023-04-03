<template>
  <base-card>
    <div id="loginform">
      <h2>LOGIN</h2>
      <form @submit.prevent>
        <div class="forminput">
          <label for="email">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email Here"
            id="email"
            v-model.trim="email"
          />
        </div>
        <div class="forminput">
          <label for="password">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password Here"
            id="password"
            v-model.trim="password"
          />
        </div>
        <p v-if="!formIsValid">Invalid Inputs.</p>
        <div class="loginfooter">
          <router-link to="/register">Not a member? Register Now!</router-link>
          <button class="submit-btn" @click="submitForm">Submit</button>
        </div>
      </form>
    </div>
  </base-card>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
      this.$router.replace("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  max-width: 50%;
}
#loginform {
  justify-content: center;
  width: auto;
  text-align: center;
  h2 {
    font-size: 40px;
  }
  .forminput {
    text-align: left;
    input {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      box-sizing: border-box;
      border-radius: 12px;
    }
  }
  .loginfooter {
    display: flex;
  }
  .submit-btn {
    flex: 70%;
    align-items: flex-end;

    max-width: 30%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 12px;
    background-color: #dee3dd;
    transition-duration: 0.4s;
  }
  .submit-btn:hover {
    background-color: #4caf50; /* Green */
    color: white;
  }
  a {
    flex: 30%;
    align-items: flex-start;
    color: rgb(58, 86, 82);
  }
  a:hover {
    color: rgb(20, 64, 225);
  }
}
</style>
