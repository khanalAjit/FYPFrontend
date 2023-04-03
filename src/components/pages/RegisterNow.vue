<template>
  <base-card>
    <div id="registration-form">
      <h2>Sign Up Here</h2>
      <form @submit.prevent>
        <div class="forminput">
          <label for="name">Full Name</label>
          <input
            type="text"
            placeholder="Enter Your Fullname Here"
            id="name"
            v-model="name"
          />
        </div>
        <div class="radioinput">
          <legend>Role:</legend>
          <label for="caretaker">Caretaker</label>
          <input
            type="radio"
            name="role"
            id="caretaker"
            value="caretaker"
            v-model="role"
          />
          <label for="careseeker">Careseeker</label>
          <input
            type="radio"
            name="role"
            id="careseeker"
            value="careseeker"
            v-model="role"
          />
        </div>

        <div class="forminput">
          <label for="email">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email Here"
            id="email"
            v-model="email"
          />
        </div>
        <div class="forminput">
          <label for="password">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password Here"
            id="password"
            v-model="password"
          />
        </div>
        <div class="forminput">
          <label for="re-password">Verify Password</label>
          <input
            type="password"
            placeholder="Enter Passowrd Again"
            id="re-password"
          />
        </div>
        <p v-if="!formIsValid">Invalid Credentials</p>
        <div class="regfooter">
          <router-link to="/login">Already a member? Login!</router-link>

          <button class="submit-btn" @click="submitForm()">Sign Up</button>
        </div>
      </form>
    </div>
  </base-card>
</template>
<script>
export default {
  data() {
    return {
      formIsValid: true,
      name: "",
      email: "",
      password: "",
      role: null,
    };
  },
  methods: {
    submitForm() {
      console.log(this.role);
      this.formIsValid = true;
      if (
        this.name === "" ||
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6 ||
        this.role === null
      ) {
        this.formIsValid = false;
        return;
      }

      this.$store.dispatch("signup", {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
      });
      this.$router.replace("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  max-width: 50%;
}
#registration-form {
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
  .regfooter {
    display: flex;
  }

  .submit-btn {
    flex: 70%;
    max-width: 30%;
    align-items: flex-end;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 12px;
    background-color: #dee3dd;
    transition-duration: 0.4s;
  }
  .submit-btn:hover {
    background-color: #68c5e7; /* Green */
    color: white;
  }
  .radioinput {
    text-align: left;
    padding: 12px;
    label {
      margin: 20px 20px 20px 0;
    }
    input {
      margin: 20px 20px 20px 0;
    }
  }
  a {
    flex: 30%;
    color: rgb(58, 86, 82);
    align-items: flex-start;
  }
  a:hover {
    color: rgb(20, 64, 225);
  }
}
</style>
