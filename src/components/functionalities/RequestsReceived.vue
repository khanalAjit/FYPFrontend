<template>
  <base-card>
    <h1>Requested By: {{ requestorName }}</h1>
    <article>
      <p>Service Type: {{ serviceType }}</p>
      <p>Service Of: {{ serviceOf }}</p>
      <p>PickUp Date: {{ pickUpDate }}</p>
      <p>Drop Off Date: {{ dropOffDate }}</p>
    </article>
    <div>
      <button v-if="`${status}` == 'requested'" @click="acceptRequest">
        Accept
      </button>
      <button v-if="`${status}` == 'requested'" @click="rejectRequest">
        Reject
      </button>
    </div>
  </base-card>
</template>

<script>
export default {
  emits: ["accept-request", "reject-request"],
  props: [
    "id",
    "requestorName",
    "serviceType",
    "serviceOf",
    "pickUpDate",
    "dropOffDate",
    "status",
  ],
  data() {
    return {
      serviceId: null,
    };
  },

  methods: {
    acceptRequest() {
      this.serviceId = {
        id: this.id,
      };
      this.$emit("accept-request", this.serviceId);
    },
    rejectRequest() {
      this.serviceId = {
        id: this.id,
      };
      this.$emit("reject-request", this.serviceId);
    },
  },
};
</script>
