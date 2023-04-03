<template>
  <h1>Here are our Professionals</h1>
  <div>
    <filter-caretakers @change-filter="applyFilters"> </filter-caretakers>
  </div>
  <div>
    <button @click="loadCaretakers()">Refresh</button>
    <button v-if="isCaretaker">
      <router-link to="requests"> Received</router-link>
    </button>
    <div class="try">
      <base-card
        v-for="people in availableCaretakers"
        :key="people.profileId"
        class="caretakerDetails"
      >
        <caretaker-details
          :key="people.profileId"
          :id="people.profileId"
          :imageUrl="people.profileImageUrl"
          :Name="people.name"
          :speciality="people.speciality"
          :rate="people.rate"
          :location="people.location"
          :bio="people.bio"
        ></caretaker-details>
      </base-card>
      <div class="spacer"></div>
    </div>
  </div>
</template>
<script>
import CaretakerDetails from "../functionalities/CaretakerDetails.vue";
import FilterCaretakers from "../functionalities/FilterCaretakers.vue";
export default {
  data() {
    return {
      activeFilters: {
        dog: true,
        cat: true,
        fish: true,
      },
    };
  },
  components: {
    CaretakerDetails,
    FilterCaretakers,
  },
  computed: {
    availableCaretakers() {
      const caretakers = this.$store.getters["caretakers/caretakers"];
      return caretakers.filter((caretaker) => {
        if (this.activeFilters.dog && caretaker.speciality.includes("dog")) {
          return true;
        }
        if (this.activeFilters.cat && caretaker.speciality.includes("cat")) {
          return true;
        }
        if (this.activeFilters.fish && caretaker.speciality.includes("fish")) {
          return true;
        }
        return false;
      });
    },
    hasCaretakers() {
      return this.$store.getters["caretakers/hasCaretakers"];
    },
    isCaretaker() {
      return this.$store.getters["caretakers/isCaretaker"];
    },
  },
  created() {
    this.loadCaretakers();
  },
  methods: {
    applyFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    loadCaretakers() {
      this.$store.dispatch("caretakers/loadCaretakers");
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 25px;
  color: rgb(24, 24, 24);
}
.try {
  display: flex;
  flex-wrap: wrap;
}
div.caretakerDetails {
  flex: 40%;
  margin: 10px;
  margin-top: 50px;
  max-width: 100%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  transition: transform 0.5s;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}
div.caretakerDetails:hover {
  transform: scale(1.05);
}
div.spacer {
  margin: 0 10px;
  padding: 0 10px;
  flex: 40%;
}
</style>
