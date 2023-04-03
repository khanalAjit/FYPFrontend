import axios from "axios";
export default {
  async loadAdoptionPosts(context) {
    const token = context.rootGetters.token;
    const response = await axios.get("http://localhost:5000/api/v1/adoptions", {
      headers: { Authorization: "Bearer " + token },
    });
    const responseData = await response.data.posts;

    const posts = [];

    for (const key in responseData) {
      const post = {
        postId: responseData[key]._id,
        username: responseData[key].username,
        posterImageUrl: responseData[key].posterImageUrl,
        description: responseData[key].description,
        number: responseData[key].number,
        postImageUrl: responseData[key].postImages,
      };
      posts.push(post);
    }
    context.commit("setPosts", posts);
  },
  async getMyPosts(context) {
    const token = context.rootGetters.token;
    const response = await axios.get(
      "http://localhost:5000/api/v1/adoptions/myposts?auth=",
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    const responseData = await response.data.postedPosts;

    const posts = [];

    for (const key in responseData) {
      const post = {
        postId: responseData[key].id,
        username: responseData[key].username,
        posterImageUrl: responseData[key].posterImageUrl,
        description: responseData[key].description,
        number: responseData[key].number,
        postImageUrl: responseData[key].postImages,
      };
      posts.push(post);
    }
    context.commit("setPosts", posts);
  },

  async addAdoptionPost(context, payload) {
    const token = context.rootGetters.token;

    const { ...postData } = payload;

    const response = await axios.post(
      " http://localhost:5000/api/v1/adoptions",
      postData,
      {
        headers: {
          Authorization: "Bearer " + token,

          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!response) {
      return response.status(400).json("could not post");
    }
    context.commit("addAdoptionPost", postData);
  },
};
