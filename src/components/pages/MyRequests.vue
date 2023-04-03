<template>
  <div>
    <base-card>
      <div>
        <button><router-link to="services">Services</router-link></button>
      </div>
      <div>
        <button @click="loadRequests">Received Requests</button>
        <button @click="loadAcceptedRequests">Accepted Requests</button>
        <button @click="loadRejectedRequests">Rejected Requests</button>
        <header>
          <h1>{{ title }}</h1>
        </header>
      </div>
      <div v-if="receivedRequest">
        <requests-received
          @accept-request="acceptRequest"
          @reject-request="rejectRequest"
          v-for="req in receivedRequests"
          :key="req.id"
          :id="req.id"
          :requestorName="req.requestorName"
          :serviceType="req.serviceType"
          :serviceOf="req.serviceOf"
          :status="req.status"
          :pickUpDate="req.pickUpDate"
          :dropOffDate="req.dropOffDate"
        ></requests-received>
      </div>
      <div v-if="acceptedRequest">
        <requests-received
          @accept-request="acceptRequest"
          @reject-request="rejectRequest"
          v-for="req in receivedRequests"
          :key="req.id"
          :id="req.id"
          :requestorName="req.requestorName"
          :serviceType="req.serviceType"
          :serviceOf="req.serviceOf"
          :status="req.status"
          :pickUpDate="req.pickUpDate"
          :dropOffDate="req.dropOffDate"
        ></requests-received>
      </div>
      <div v-if="rejectedRequest">
        <requests-received
          @accept-request="acceptRequest"
          @reject-request="rejectRequest"
          v-for="req in receivedRequests"
          :key="req.id"
          :id="req.id"
          :requestorName="req.requestorName"
          :serviceType="req.serviceType"
          :serviceOf="req.serviceOf"
          :status="req.status"
          :pickUpDate="req.pickUpDate"
          :dropOffDate="req.dropOffDate"
        ></requests-received>
      </div>
    </base-card>
  </div>
</template>
<script>
import RequestsReceived from "../functionalities/RequestsReceived.vue";
export default {
  data() {
    return {
      receivedRequest: true,
      acceptedRequest: false,
      rejectedRequest: false,
      title: "Here are your requestes received",
    };
  },
  components: {
    RequestsReceived,
  },

  computed: {
    receivedRequests() {
      console.log(this.$store.getters["requests/requests"]);
      return this.$store.getters["requests/requests"];
    },
  },
  created() {
    this.loadRequests();
  },
  updated() {
    this.loadRequests();
  },
  methods: {
    loadRequests() {
      this.$store.dispatch("requests/getContactRequests");
    },
    acceptRequest(serviceId) {
      this.$store.dispatch("requests/acceptRequest", serviceId);
    },
    rejectRequest(serviceId) {
      this.$store.dispatch("requests/rejectRequest", serviceId);
    },
    loadAcceptedRequests() {
      this.title = "Here are the requests you accepted";
      (this.receivedRequest = false),
        (this.acceptedRequest = true),
        (this.rejectedRequest = false),
        this.$store.dispatch("requests/getAcceptedRequests");
    },
    loadRejectedRequests() {
      this.title = "Here are the requests you rejected";
      (this.receivedRequest = false),
        (this.acceptedRequest = false),
        (this.rejectedRequest = true),
        this.$store.dispatch("requests/getRejectedRequests");
    },
  },
};
</script>
