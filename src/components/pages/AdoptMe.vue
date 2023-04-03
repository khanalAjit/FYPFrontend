<template>
  <!--This div contains the form i.e can only be seen by caretakers or admins-->

  <div class="adoptionform" v-show="isAdmin">
    <button
      class="show-btn"
      v-if="!showPostCreation"
      @click="showPostCreation = true"
    >
      Create a post
    </button>
    <button class="cancel-btn" v-else @click="showPostCreation = false">
      Cancel
    </button>

    <!--Form-->
    <base-card v-if="showPostCreation">
      <form @submit="submitForm" enctype="multipart/form-data">
        <div class="image-input">
          <div class="image-header">
            <label for="image"> Show us a cutie </label>
            <button class="post-btn">Post</button>
          </div>
          <input
            type="file"
            id="image"
            name="postImage"
            accept="image/*"
            @change="uploadFile"
          />
        </div>
        <div class="contact-input">
          <label for="number">Contact Information</label>
          <input type="number" id="number" v-model.number="phone" />
        </div>
        <div class="description-input">
          <label for="description">Tell us about this cutie</label>
          <textarea
            type="text-area"
            id="description"
            v-model.trim="description"
          />
        </div>
      </form>
    </base-card>
  </div>

  <!--This div is available for all users-->

  <div>
    <h1>Maybe Your New Bestfriend?</h1>
    <adoption-details
      v-for="post in adoptionPosts"
      :key="post.postId"
      :username="post.username"
      :posterImageUrl="post.posterImageUrl"
      :description="post.description"
      :contact="post.number"
      :postImageUrl="post.postImageUrl"
    ></adoption-details>
  </div>
</template>
<script>
import AdoptionDetails from "../functionalities/AdoptionDetails.vue";

export default {
  components: {
    AdoptionDetails,
  },
  data() {
    return {
      showPostCreation: false,
      isAdmin: true,
      postImage: null,
      phone: null,
      description: "",
    };
  },
  computed: {
    adoptionPosts() {
      return this.$store.getters["adoptions/posts"];
    },
  },
  watch: {
    "$store.state.getters[adoptions/posts]": {
      handler() {
        this.loadAdoptionPosts();
      },
      immediate: true,
    },
  },
  created() {
    this.loadAdoptionPosts();
  },
  methods: {
    loadAdoptionPosts() {
      this.$store.dispatch("adoptions/loadAdoptionPosts");
    },
    uploadFile(event) {
      this.postImage = event.target.files[0];
      console.log(this.postImage);
    },
    submitForm() {
      const formData = {
        postImage: this.postImage,
        phone: this.phone,
        description: this.description,
      };

      this.$store.dispatch("adoptions/addAdoptionPost", formData);
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: rgb(30, 103, 101);
  font-size: 30px;
  text-align: center;
}
.adoptionform {
  .card {
    max-width: 50%;
  }
  .contact-input {
    text-align: left;
    margin-top: 50px;

    label {
      font-size: 18px;
    }
    input {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      box-sizing: border-box;
      border-radius: 12px;
    }
  }
  .description-input {
    text-align: left;
    margin-top: 50px;
    label {
      font-size: 20px;
    }
    textarea {
      width: 100%;
      height: 150px;
      padding: 12px 20px;
      margin: 8px 0;
      box-sizing: border-box;
      border-radius: 12px;
    }
  }
  .image-input {
    text-align: left;
    .image-header {
      display: flex;
    }
    label {
      font-size: 20px;
      flex: 70%;
    }
    input {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      box-sizing: border-box;
      border-radius: 12px;
    }
  }
}

.show-btn {
  background-color: #255725; /* Green */
  border: none;
  color: white;
  margin-left: 50px;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 18px;
  transition-duration: 0.5s;
}
.show-btn:hover {
  background-color: #5cf561;
}
.cancel-btn {
  background-color: #5a1414; /* Green */
  border: none;
  color: white;
  margin-left: 50px;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 18px;
  transition-duration: 0.5s;
}
.cancel-btn:hover {
  background-color: #fc1515;
}
.post-btn {
  background-color: #0f155c; /* Green */
  flex: 30%;
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  border-radius: 18px;
  transition-duration: 0.5s;
}
.post-btn:hover {
  background-color: #36a6f6;
}
</style>
