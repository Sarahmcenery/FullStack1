import { v4 } from "uuid";
import { bridgeMemStore } from "./bridge-mem-store.js";

let bridgelists = [];

export const bridgelistMemStore = {
  async getAllBridgelists() {
    return bridgelists;
  },

  async addBridgelist(bridgelist) {
    bridgelist._id = v4();
    bridgelists.push(bridgelist);
    return bridgelist;
  },

  async getBridgelistById(id) {
    const list = bridgelists.find((bridgelist) => bridgelist._id === id);
    if (list) {
    list.bridges = await bridgeMemStore.getBridgesByBridgelistId(list._id);
    return list;
  }
  return null;
},

  async getUserBridgelists(userid) {
    return bridgelists.filter((bridgelist) => bridgelist.userid === userid);
  },

  async deleteBridgelistById(id) {
    const index = bridgelists.findIndex((bridgelist) => bridgelist._id === id);
    if (index !== -1) bridgelists.splice(index, 1);
  },

  async deleteAllBridgelists() {
    bridgelists = [];
  },
};