import axios from "axios";

export default {
  async contactCaretaker(context, payload) {
    const token = context.rootGetters.token;
    const caretakerId = payload.receiversId;

    const newRequest = {
      //receiversId: payload.receiversId,
      serviceType: payload.serviceType,
      serviceOf: payload.serviceOf,
      pickUpDate: payload.pickUpDate,
      dropOffDate: payload.dropOffDate,
    };
    const response = await axios.post(
      `http://localhost:5000/api/v1/services/${caretakerId}`,
      {
        ...newRequest,
      },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );

    if (!response) {
      console.log("some error happened");
    }
    context.commit("addRequest", newRequest);
  },
  async getContactRequests(context) {
    const token = context.rootGetters.token;

    const response = await axios.get("http://localhost:5000/api/v1/services", {
      headers: { Authorization: "Bearer " + token },
    });

    const responseData = await response.data;

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: responseData[key]._id,
        requestorName: responseData[key].requestorName,
        requestedBy: responseData[key].careseeker,
        serviceType: responseData[key].serviceType,
        serviceOf: responseData[key].serviceOf,
        status: responseData[key].status,
        pickUpDate: responseData[key].pickUpDate,
        dropOffDate: responseData[key].dropOffDate,
      };
      requests.push(request);
    }

    context.commit("setServiceRequests", requests);
  },
  async getAcceptedRequests(context) {
    const token = context.rootGetters.token;

    const response = await axios.get(
      "http://localhost:5000/api/v1/services/acceptedrequests",
      {
        headers: { Authorization: "Bearer " + token },
      }
    );

    const responseData = await response.data;

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: responseData[key]._id,
        requestorName: responseData[key].requestorName,
        requestedBy: responseData[key].careseeker,
        serviceType: responseData[key].serviceType,
        serviceOf: responseData[key].serviceOf,
        status: responseData[key].status,

        pickUpDate: responseData[key].pickUpDate,
        dropOffDate: responseData[key].dropOffDate,
      };
      requests.push(request);
    }
    context.commit("setServiceRequests", requests);
  },
  async getRejectedRequests(context) {
    const token = context.rootGetters.token;

    const response = await axios.get(
      "http://localhost:5000/api/v1/services/rejectedrequests",
      {
        headers: { Authorization: "Bearer " + token },
      }
    );

    const responseData = await response.data;

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: responseData[key]._id,
        requestorName: responseData[key].requestorName,
        requestedBy: responseData[key].careseeker,
        serviceType: responseData[key].serviceType,
        serviceOf: responseData[key].serviceOf,
        status: responseData[key].status,

        pickUpDate: responseData[key].pickUpDate,
        dropOffDate: responseData[key].dropOffDate,
      };
      requests.push(request);
    }
    context.commit("setServiceRequests", requests);
  },

  async rejectRequest(context, payload) {
    const token = context.rootGetters.token;
    const serviceId = payload.id;

    /* const response = await axios.patch(
      `http://localhost:5000/api/v1/services/${serviceId}/reject`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    ); */
    const response = await axios({
      method: "patch",
      url: `http://localhost:5000/api/v1/services/${serviceId}/reject`,
      headers: { Authorization: "Bearer " + token },
    });

    console.log(response);
    context.dispatch("services/getContactRequests");
  },

  async acceptRequest(context, payload) {
    const token = context.rootGetters.token;
    const serviceId = payload.id;

    /* const response = await axios.patch(
      `http://localhost:5000/api/v1/services/${serviceId}/accept`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    ); */
    const response = await axios({
      method: "patch",
      url: `http://localhost:5000/api/v1/services/${serviceId}/accept`,
      headers: { Authorization: "Bearer " + token },
    });
    console.log(response);
    context.dispatch("services/getContactRequests");
  },
};
