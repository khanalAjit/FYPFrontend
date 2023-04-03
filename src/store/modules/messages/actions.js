import axios from "axios";
export default {
  async sendMessage(context, payload) {
    const token = context.rootGetters.token;
    console.log("Add profile 'getters ko data' ");
    console.log(payload);
    const caretakerId = payload.caretakerId;
    const messageData = {
      message: payload.message,
      email: payload.email,
    };

    const response = await axios.post(
      `http://localhost:5000/api/v1/messages/${caretakerId}`,
      {
        ...messageData,
      },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );

    console.log(response);
    context.commit("sendMessage", messageData);
  },

  async getMessages(context) {
    const token = context.rootGetters.token;

    const response = await axios.get(
      "http://localhost:5000/api/v1/messages/myhistory",
      {
        headers: { Authorization: "Bearer " + token },
      }
    );

    const responseData = await response.data.history;
    console.log(responseData);
    const messages = [];

    for (const key in responseData) {
      const message = {
        senderId: responseData[key].from,
        senderEmail: responseData[key].email,
        message: responseData[key].message,
      };
      messages.push(message);
    }
    context.commit("viewMessage", messages);
  },
};
