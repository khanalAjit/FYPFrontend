<template>
  <div class="profile-container">
    <div class="profile-image">
      <img
        :src="`http://localhost:5000/profiles/${imageUrl}`"
        alt="Image Here"
      />
    </div>
    <div class="profile-details">
      <input
        type="text"
        name=""
        id=""
        :value="`${username}`"
        :readonly="false"
      />
      <h1>Username : {{ username }}</h1>
      <h3>Email: {{ email }}</h3>
      <h3>Name: {{ Name }}</h3>

      <h5>Speciality: {{ speciality }}</h5>

      <h5>Rate : $ {{ rate }} p/day</h5>
      <h5>Contact: {{ contact }}</h5>
      <p>Location: {{ location }}</p>
      <p>Bio:{{ bio }}</p>

      <button>Update Profile Details</button>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "id",
    "username",
    "imageUrl",
    "email",
    "Name",
    "speciality",
    "rate",
    "contact",
    "location",
    "bio",
    "verificationStatus",
  ],
};
</script>

<style lang="scss" scoped>
img {
  height: 200px;
  width: 200px;
  border-radius: 20%;
}
.profile-container {
  display: flex;
  .profile-details {
    padding: 20px;
    margin: 20px;
  }
  .profile-image {
    padding: 20px;
    margin: 20px;
  }
  button {
    background-color: #3fccc5;
    border: none;
    color: white;
    margin: 20px;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 12px;
    transition-duration: 0.4s;
  }
  button:hover {
    background-color: #4caf50;
    color: rgb(0, 0, 0);
  }
}
</style>
