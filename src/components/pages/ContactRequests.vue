<template>
  <div>
    <base-card>
      <div>
        <header>
          <h2>Requests Received</h2>
          <button><router-link to="caretakers">Caretakers</router-link></button>
        </header>
      </div>
      <div>
        <request-item
          v-for="req in receivedRequests"
          :key="req.id"
          :email="req.senderEmail"
          :message="req.message"
        ></request-item>
      </div>
    </base-card>
  </div>
</template>

<script>
import RequestItem from "../functionalities/RequestItem.vue";
export default {
  components: {
    RequestItem,
  },
  created() {
    this.loadMessages();
  },
  mounted() {
    this.loadMessages();
  },
  computed: {
    receivedRequests() {
      return this.$store.getters["messages/messages"];
    },
  },
  methods: {
    loadMessages() {
      this.$store.dispatch("messages/getMessages");
    },
  },
};
</script>
