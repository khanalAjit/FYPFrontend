<template>
  <div id="app">
    <navigation-mobile v-show="mobileView && showNav"></navigation-mobile>
    <div class="content" :class="{ open: showNav }">
      <div class="top-bar">
        <div id="navigation-icon" v-if="mobileView" @click="showNav = !showNav">
          <i class="fas fa-bars"></i>
        </div>
        <the-navigation v-if="!mobileView"></the-navigation>
      </div>
      <the-content>
        <router-view></router-view>
      </the-content>
    </div>
  </div>
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";
import NavigationMobile from "./components/NavigationMobile.vue";
import TheContent from "./components/TheContent.vue";
export default {
  data: () => {
    return {
      mobileView: true,
      showNav: false,
    };
  },
  components: {
    TheNavigation,
    NavigationMobile,
    TheContent,
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
    this.$store.dispatch("tryLogin");
  },
  watch: {
    $route(to, from) {
      this.showNav = false;
      console.log(`routed from ${from} to ${to}`);
    },
  },
  methods: {
    handleView() {
      if (window.innerWidth <= 990) {
        this.mobileView = true;
      } else {
        this.mobileView = false;
        this.showNav = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://use.fontawesome.com/releases/v5.9.0/css/all.css");
* {
  font-size: 1rem;
}
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", Tahoma;
  background-image: url("C:/Users/Ajit Khanal/Desktop/fyp_project/src/assets/background.jpg");
}
#app {
  position: relative;
  width: auto;
  height: auto;
  padding: 10px;
  color: #333;
}
.top-bar {
  display: block;
  width: 100%;
}
#navigation-icon {
  padding: 10px 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  i {
    font-size: 2rem;
  }
}
.content {
  position: absolute;
  top: 10px;
  width: 95.5%;
  height: auto;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  transition: 1s transform cubic-bezier(0, 0.12, 0.14, 1);
}
.open {
  transform: translateX(300px);
}
</style>
