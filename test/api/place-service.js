import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const placeService = {
  placeUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placeUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placeUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.placeUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placeUrl}/api/users`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.placeUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  async makePlace(id, place) {
    const response = await axios.post(`${this.placeUrl}/api/counties/${id}/places`, place);
    return response.data;
  },

  async getPlaces(id) {
    const response = await axios.get(`${this.placeUrl}/api/counties/${id}/places`);
    return response.data;
  },

  async createCounty(newCounty) {
    const response = await axios.post(`${this.placeUrl}/api/counties`, newCounty);
    return response.data;
  },
};
