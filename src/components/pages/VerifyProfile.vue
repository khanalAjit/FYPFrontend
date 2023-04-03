<template>
  <h1>This is for applying for verification</h1>
  <router-link to="myprofile"><button>My Profile</button></router-link>
  <base-card>
    <h1>Please send certificates/proofs that shows your history with pets</h1>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div>
        <label for="files">Select files:</label>
        <input
          type="file"
          id="files"
          name="files"
          ref="files"
          @change="uploadFiles"
          multiple
        />
      </div>
      <div>
        <label for="message">Your Message</label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          v-model="text"
        ></textarea>
      </div>
      <button>Send</button>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      text: "",
    };
  },
  methods: {
    uploadFiles() {
      const files = this.$refs.files.files;
      this.files = [...this.files, ...files];
    },
    submitForm() {
      const formData = {
        files: this.files,
        text: this.text,
      };

      this.$store.dispatch("caretakers/sendVerificationRequest", formData);
    },
  },
};
</script>
