import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { bridgeJsonStore } from "./bridge-json-store.js";

export const bridgelistJsonStore = {
  async getAllBridgelists() {
    await db.read();
    return db.data.bridgelists;
  },

  async addBridgelist(bridgelist) {
    await db.read();
    bridgelist._id = v4();
    db.data.bridgelists.push(bridgelist);
    await db.write();
    return bridgelist;
  },

  async getBridgelistById(id) {
    await db.read();
    let list = db.data.playlists.find((bridgelist) => bridgelist._id === id);
    if (list) {
      list.bridges = await bridgeJsonStore.getBridgesByBridgelistId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserBridgelists(userid) {
    await db.read();
    return db.data.bridgelists.filter((bridgelist) => bridgelist.userid === userid);
  },

  async deleteBridgelistById(id) {
    await db.read();
    const index = db.data.bridgelists.findIndex((bridgelist) => bridgelist._id === id);
    if (index !== -1) db.data.bridgelists.splice(index, 1);
    await db.write();
  },

  async deleteAllBridgelists() {
    db.data.bridgelists = [];
    await db.write();
  },
};
