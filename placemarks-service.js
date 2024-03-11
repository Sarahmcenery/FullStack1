import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const placemarksService = {
  placemarksUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placemarksUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarksUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placemarksUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarksUrl}/api/users`);
    return res.data;
  },
  
  async createBridgelist(bridgelist) {
    const res = await axios.post(`${this.placemarksUrl}/api/bridgelists`, bridgelist);
    return res.data;
  },

  async deleteAllBridgelists() {
    const response = await axios.delete(`${this.placemarksUrl}/api/bridgelists`);
    return response.data;
  },

  async deleteBridgelist(id) {
    const response = await axios.delete(`${this.placemarksUrl}/api/bridgelists/${id}`);
    return response;
  },

  async getAllBridgelists() {
    const res = await axios.get(`${this.placemarksUrl}/api/bridgelists`);
    return res.data;
  },

  async getBridgelist(id) {
    const res = await axios.get(`${this.placemarksUrl}/api/bridgelists/${id}`);
    return res.data;
  },

  async getAllTracks() {
    const res = await axios.get(`${this.placemarksUrl}/api/bridges`);
    return res.data;
  },

  async createTrack(id, track) {
    const res = await axios.post(`${this.placemarksUrl}/api/bridgelists/${id}/bridges`, track);
    return res.data;
  },

  async deleteAllTracks() {
    const res = await axios.delete(`${this.placemarksUrl}/api/bridges`);
    return res.data;
  },

  async getTrack(id) {
    const res = await axios.get(`${this.placemarksUrl}/api/bridges/${id}`);
    return res.data;
  },

  async deleteTrack(id) {
    const res = await axios.delete(`${this.placemarksUrl}/api/bridges/${id}`);
    return res.data;
  },
};