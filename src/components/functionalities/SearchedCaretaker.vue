<template>
  <img :src="`http://localhost:5000/profiles/${imageUrl}`" alt="Image Here" />

  <h3>{{ Name }}</h3>

  <h5>Caretaker of: {{ speciality }}</h5>

  <h5>Rate : $ {{ rate }} p/day</h5>

  <p>Location: {{ location }}</p>
  <p>Bio: {{ bio }}</p>
  <button v-if="!isCaretaker" @click="sendRequest">Request</button>
</template>

<script>
export default {
  props: ["id", "imageUrl", "Name", "speciality", "rate", "location", "bio"],
  emits: ["send-request"],
  data() {
    return {
      receiversDetails: null,
    };
  },
  computed: {
    /* caretakerContactLink() {
      return this.$route.path + "/" + this.id + "/contact"; // /caretakers/1/contact
    }, */
    isCaretaker() {
      return this.$store.getters["caretakers/isCaretaker"];
    },
  },
  methods: {
    sendRequest() {
      this.receiversDetails = {
        id: this.id,
      };
      this.$emit("send-request", this.receiversDetails);
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
}
.header {
  display: flex;
  h3 {
    flex: 30%;
    justify-content: flex-start;
  }
  .contact-btn {
    background-color: #3fccc5;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 12px;
    transition-duration: 0.4s;
  }
  .contact-btn:hover {
    background-color: #4caf50;
    color: rgb(0, 0, 0);
  }
}
</style>
