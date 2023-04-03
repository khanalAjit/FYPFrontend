import axios from "axios";

export default {
  async login(context, payload) {
    const loginData = {
      email: payload.email,
      password: payload.password,
    };

    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      {
        ...loginData,
      }
    );
    console.log(response);
    const responseData = await response.data;
    const userId = responseData.userdetails.id;
    console.log(userId);

    localStorage.setItem("token", responseData.token);
    localStorage.setItem("userId", userId);

    context.commit("setUser", {
      token: responseData.token,
      userId: userId,
    });
  },

  async signup(context, payload) {
    const registrationData = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    };

    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/register",
      {
        ...registrationData,
      }
    );
    console.log(response);
    const responseData = await response.data;
    const userId = responseData.user._id;
    console.log(userId);
    context.commit("setUser", {
      token: responseData.token,
      userId: userId,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  async getAdmins(context) {
    const token = context.rootGetters.token;
    const response = await axios.get("http://localhost:5000/api/v1/admins", {
      headers: { Authorization: "Bearer " + token },
    });
    const responseData = await response.data.admins;

    const admins = [];

    for (const key in responseData) {
      const admin = {
        userId: responseData[key].userId,
        name: responseData[key].name,
        username: responseData[key].username,
        email: responseData[key].email,
      };
      admins.push(admin);
    }
    context.commit("setAdmins", admins);
  },
};
