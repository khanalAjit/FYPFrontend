<template>
  <base-card class="swiper-div">
    <swiper
      :slides-per-view="1"
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="(image, index) in images" :key="index">
        <img :src="image" :alt="index" />
      </swiper-slide>
    </swiper>
  </base-card>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      images: [
        "http://placekitten.com/600/500",
        "https://picsum.photos/id/237/600/500",
        "https://a-z-animals.com/media/2022/07/petfish.jpg",
      ],
    };
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.swiper-div {
  height: auto;
  width: auto;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 12px;
  }
}
</style>
