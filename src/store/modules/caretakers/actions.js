import axios from "axios";
export default {
  async addProfile(context, payload) {
    const token = context.rootGetters.token;

    const caretakersData = {
      username: payload.username,
      profilePic: payload.profileImageUrl,
      email: payload.email,
      name: payload.name,
      bio: payload.bio,
      speciality: payload.speciality,
      rate: payload.rate,
      contact: payload.contact,
      location: payload.location,
      verificationStatus: "pending",
    };

    const response = await axios.post(
      "http://localhost:5000/api/v1/profiles",
      {
        ...caretakersData,
      },
      {
        headers: {
          Authorization: "Bearer " + token,

          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
    context.commit("addProfile", caretakersData);
  },

  async loadCaretakers(context) {
    const token = context.rootGetters.token;
    const response = await axios.get(
      "http://localhost:5000/api/v1/profiles/caretakers",
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    const responseData = await response.data.profiles;

    const caretakers = [];

    for (const key in responseData) {
      const caretaker = {
        profileId: responseData[key]._id,
        userId: responseData[key].profileOf,
        username: responseData[key].username,
        profileImageUrl: responseData[key].profileImageUrl,
        email: responseData[key].email,
        name: responseData[key].name,
        bio: responseData[key].bio,
        speciality: responseData[key].speciality,
        rate: responseData[key].rate,
        contact: responseData[key].contact,
        location: responseData[key].location,
        verificationStatus: responseData[key].verificationStatus,
      };
      caretakers.push(caretaker);
    }
    context.commit("setCaretakers", caretakers);
  },

  async getMyProfile(context) {
    const token = context.rootGetters.token;
    const response = await axios.get("http://localhost:5000/api/v1/profiles", {
      headers: { Authorization: "Bearer " + token },
    });
    if (!response) {
      console.log("Error gettng profile");
    }
    const responseData = await response.data;

    const profile = [
      {
        profileId: responseData._id,
        userId: responseData.profileOf,
        username: responseData.username,
        imageUrl: responseData.profileImageUrl,
        email: responseData.email,
        name: responseData.name,
        bio: responseData.bio,
        speciality: responseData.speciality,
        rate: responseData.rate,
        contact: responseData.contact,
        location: responseData.location,
        verificationStatus: responseData.verificationStatus,
      },
    ];

    context.commit("setProfile", profile);
  },
  async sendVerificationRequest(context, payload) {
    const token = context.rootGetters.token;

    const verificationDetails = {
      text: payload.text,

      files: payload.files,
    };

    const response = await axios.patch(
      "http://localhost:5000/api/v1/profiles/applyverification",
      {
        ...verificationDetails,
      },
      {
        headers: {
          Authorization: "Bearer " + token,

          "Content-Type": "multipart/form-data",
        },
      }
    );
    const responseData = response.data.updatedProfile;
    context.commit("setProfile", responseData);
  },
};
