<template>
  <base-card>
    <div id="adoptionpost">
      <header>
        <img
          :src="`http://localhost:5000/profiles/${posterImageUrl}`"
          alt="profilepic"
          class="posterImage"
        />
        <h4>{{ username }}</h4>
      </header>
    </div>
    <p>{{ description }}</p>
    <p class="contact">Call : {{ contact }} for more info.</p>
    <div class="postImageDiv">
      <img :src="`http://localhost:5000/uploads/${postImageUrl}`" alt="" />
    </div>
  </base-card>
</template>

<script>
export default {
  props: [
    "username",
    "posterImageUrl",
    "description",
    "contact",
    "postImageUrl",
  ],
};
</script>

<style lang="scss" scoped>
.contact {
  color: rgb(210, 38, 187);
}
.card {
  max-width: 65%;
}

#adoptionpost {
  h4 {
    display: inline-block;
    font-size: 20px;
  }
  .posterImage {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
.postImageDiv {
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
