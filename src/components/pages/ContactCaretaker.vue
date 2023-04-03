<template>
  <form action="" @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your Email</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">Your Message</label>
      <textarea
        name="message"
        id="message"
        rows="5"
        v-model.trim="message"
      ></textarea>
    </div>
    <p class="errors" v-if="!validForm">
      Please enter a valid email and leave a message.
    </p>
    <div class="actions">
      <button>Send Message</button>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      message: "",
      validForm: true,
    };
  },
  methods: {
    submitForm() {
      this.validForm = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.message === ""
      ) {
        this.validForm = false;
        return;
      }

      this.$store.dispatch("messages/sendMessage", {
        email: this.email,
        message: this.message,
        caretakerId: this.$route.params.id,
      });
      this.$router.replace("/caretakers");
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
