<template>
  <div class="profileCreationForm" v-if="isLoggedIn">
    <base-card v-if="!hasProfile && isCaretaker">
      <h1>Create Your Profile</h1>
      <profile-creation @save-data="saveData"></profile-creation>
    </base-card>
  </div>
  <p v-if="!hasProfile && !isCaretaker">
    You need to register as a caretaker to use this feature. You can visit
    <router-link to="caretakers">Caretakers</router-link> for now
  </p>
  <div>
    <base-card v-for="profile in myProfile" :key="profile.profileId">
      <profile-details
        :id="profile.profileId"
        :username="profile.username"
        :imageUrl="profile.imageUrl"
        :email="profile.email"
        :Name="profile.name"
        :speciality="profile.speciality"
        :rate="profile.rate"
        :contact="profile.contact"
        :location="profile.location"
        :bio="profile.bio"
        :verificationStatus="profile.verificationStatus"
      >
      </profile-details>
      <router-link to="applyforverification">
        <button v-if="!isVerified">Apply For Verification</button>
      </router-link>
    </base-card>
  </div>
</template>
<script>
import ProfileDetails from "../functionalities/ProfileDetails.vue";
import ProfileCreation from "../functionalities/ProfileCreation.vue";
export default {
  data() {
    return {};
  },
  components: { ProfileDetails, ProfileCreation },
  created() {
    this.loadCaretakers();
  },
  computed: {
    myProfile() {
      return this.$store.getters["caretakers/myProfile"];
    },
    isLoggedIn() {
      return this.$store.getters["isLoggedIn"];
    },
    isCaretaker() {
      return this.$store.getters["caretakers/isCaretaker"];
    },
    hasProfile() {
      return this.$store.getters["caretakers/hasProfile"];
    },
    isVerified() {
      return this.$store.getters["caretakers/isVerified"];
    },
  },
  methods: {
    loadCaretakers() {
      this.$store.dispatch("caretakers/getMyProfile");
    },
    saveData(formData) {
      console.log("My Profile ko form data");
      console.log(formData);
      this.$store.dispatch("caretakers/addProfile", formData);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  max-width: 90%;
}
.profileCreationForm {
  .card {
    max-width: 50%;
  }
}
</style>
