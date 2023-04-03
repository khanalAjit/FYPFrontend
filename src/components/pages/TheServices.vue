<template>
  <div>
    <router-link to="myservices">
      <button>My Services</button>
    </router-link>
    <h1>Find Your Suitable Sitter</h1>
    <base-card class="services">
      <div class="overnightServices">
        <div>
          <span>Overnight Service</span>
        </div>
        <div>
          <button
            type="button"
            @click="handleOvernightServices"
            value="Pet-Boarding"
          >
            <i class="fas fa-hotel"></i>
            <span>Pet Boarding</span>
          </button>
        </div>
      </div>
      <div class="daytimeServices">
        <div>
          <span>Daytime Service</span>
        </div>
        <div class="serviceChoices">
          <button type="button" @click="handleDayCareServices">
            <i class="fas fa-paw"></i>
            <span>Day Care</span>
          </button>

          <button type="button" @click="handleHouseVisitServices">
            <i class="fas fa-hotel"></i>
            <span>House Visit</span>
          </button>

          <button type="button" @click="handlePetWalkingServices">
            <i class="fas fa-route"></i>
            <span>Pet Walking</span>
          </button>

          <button type="button" @click="handleDogTrainingServices">
            <i class="fas fa-medal"></i>
            <span>Dog Training</span>
          </button>
        </div>
      </div>
    </base-card>
    <base-card v-if="overnightServices">
      <h1>The service chosen is: {{ serviceValue }}</h1>

      <div class="inputs">
        <div class="inputItem">
          <label for="location">Location</label>
          <input
            type="text"
            id="location"
            placeholder="Area Near"
            v-model="location"
          />
        </div>

        <div class="inputItem">
          <label for="pets">Select Your Pet</label>
          <select name="pets" id="pets" v-model="pet">
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="fish">Fish</option>
          </select>
        </div>

        <div class="inputItem">
          <label for="pickUp">Select Pick Up Date</label>
          <input type="date" name="pickUp" id="pickUp" v-model="pickUpDate" />
        </div>

        <div class="inputItem">
          <label for="dropOff">Select Drop Off Date</label>
          <input
            type="date"
            name="dropOff"
            id="dropOff"
            v-model="dropOffDate"
          />
        </div>
      </div>
      <button class="search-btn" @click="handleSearch">Search</button>
    </base-card>

    <base-card v-if="daytimeServices">
      <h1>The service chosen is: {{ serviceValue }}</h1>

      <div class="inputs">
        <div class="inputItem">
          <label for="location">Location</label>
          <input
            type="text"
            id="location"
            placeholder="Area Near"
            v-model="location"
          />
        </div>

        <div class="inputItem">
          <label for="pets">Select Your Pet</label>
          <select name="pets" id="pets" v-model="pet">
            <option value="dog">Dog</option>
            <option v-if="!dogTraining" value="cat">Cat</option>
            <option v-if="!petWalking && !dogTraining" value="fish">
              Fish
            </option>
          </select>
        </div>

        <div class="inputItem">
          <label for="pickUp">Select Date</label>
          <input type="date" name="pickUp" id="pickUp" v-model="pickUpDate" />
        </div>
      </div>
      <button class="search-btn" @click="handleSearch">Search</button>
    </base-card>
  </div>
  <div v-if="startSearch">
    <div class="caretakersResult">
      <base-card v-for="people in matchingCaretakers" :key="people.profileId">
        <searched-caretaker
          @send-request="sendRequest"
          :key="people.profileId"
          :id="people.profileId"
          :imageUrl="people.profileImageUrl"
          :Name="people.name"
          :speciality="people.speciality"
          :rate="people.rate"
          :location="people.location"
          :bio="people.bio"
        ></searched-caretaker>
      </base-card>
      <div class="spacer"></div>
    </div>
  </div>
</template>
<script>
import SearchedCaretaker from "../functionalities/SearchedCaretaker.vue";
export default {
  data() {
    return {
      receiversId: "",
      startSearch: false,
      petWalking: false,
      dogTraining: false,
      overnightServices: true,
      daytimeServices: false,
      location: "",
      pet: "dog",
      pickUpDate: "",
      dropOffDate: "",
      serviceValue: "Pet Boarding",
    };
  },
  components: { SearchedCaretaker },
  computed: {
    matchingCaretakers() {
      const caretakers = this.$store.getters["caretakers/caretakers"];

      return caretakers.filter((caretaker) => {
        if (
          this.pet === caretaker.speciality &&
          this.location === caretaker.location
        ) {
          return true;
        }
      });
    },
  },
  methods: {
    sendRequest(receiversDetails) {
      this.receiversId = receiversDetails.id;
      const requestDetails = {
        receiversId: this.receiversId,
        serviceType: this.serviceValue,
        serviceOf: this.pet,
        pickUpDate: this.pickUpDate,
        dropOffDate: this.dropOffDate,
      };
      this.$store.dispatch("requests/contactCaretaker", requestDetails);
    },
    handleSearch() {
      if (this.location !== "") {
        this.startSearch = true;
        this.$store.dispatch("caretakers/loadCaretakers");
      }
    },

    handleOvernightServices() {
      this.startSearch = false;
      this.overnightServices = true;
      this.daytimeServices = false;
      this.serviceValue = "Pet Boarding";
    },
    handleDayCareServices() {
      this.startSearch = false;
      this.overnightServices = false;
      this.petWalking = false;
      this.daytimeServices = true;
      this.serviceValue = "Day Care";
    },
    handleHouseVisitServices() {
      this.startSearch = false;
      this.overnightServices = false;
      this.petWalking = false;
      this.daytimeServices = true;
      this.serviceValue = "House Visit";
    },
    handlePetWalkingServices() {
      this.startSearch = false;
      this.overnightServices = false;
      this.daytimeServices = true;
      this.dogTraining = false;
      this.petWalking = true;
      this.serviceValue = "Pet Walking";
    },
    handleDogTrainingServices() {
      this.startSearch = false;
      this.overnightServices = false;
      this.petWalking = false;
      this.daytimeServices = true;
      this.dogTraining = true;
      this.serviceValue = "Dog Training";
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 22px;
}
.services {
  display: flex;
  .overnightServices {
    flex: 30%;
    button {
      padding: 15px;
      margin: 15px;
      margin-left: 0px;
      box-shadow: 5px 5px rgb(90, 151, 212);
      border-radius: 10px;
      transition-duration: 0.4s;
    }
    button:hover {
      background-color: #68c5e7; /* Green */
      color: white;
    }
  }
  .daytimeServices {
    flex: 70%;
    button {
      padding: 15px;
      margin: 15px;
      margin-left: 0px;
      box-shadow: 5px 5px rgb(90, 151, 212);
      border-radius: 10px;
      transition-duration: 0.4s;
    }
    button:hover {
      background-color: #68c5e7; /* Green */
      color: white;
    }
  }
  .serviceChoices {
    display: inline-block;
    button {
      margin-right: 6px;
    }
  }
}
.inputs {
  display: flex;
  flex-wrap: wrap;
  .inputItem {
    flex: 40%;
    margin: 10px;
    padding: 5px;
    input[type="text"] {
      width: 80%;
      padding: 12px 20px;
      margin: 8px;
      border-radius: 10px;
    }
    select {
      text-align: left;
      width: 80%;
      padding: 12px 20px;
      margin: 8px;
      border: none;
      border-radius: 10px;
      background-color: #fafafa;
    }
    input[type="date"] {
      width: auto;
      padding: 12px 20px;
      margin: 8px;
      border-radius: 10px;
    }
  }
}
.search-btn {
  padding: 12px 20px;
  margin: 9px;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: #dee3dd;
  transition-duration: 0.4s;
}
.search-btn:hover {
  background-color: #68c5e7; /* Green */
  color: white;
}
.caretakersResult {
  display: flex;
  flex-wrap: wrap;
  .card {
    flex: 40%;
    margin: 20px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    transition: transform 0.5s;
  }
  .card:hover {
    transform: scale(1.05);
  }
}
</style>
